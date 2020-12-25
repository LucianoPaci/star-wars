import _get from 'lodash-es/get'

import { remove as removeDiacritics } from 'diacritics'
import { createSelector } from 'reselect'
import FuzzySearch from 'fuzzy-search'

const searchDataMapper = function (user, searchKeys) {
  const obj = {}
  searchKeys.forEach(
    (key) => (obj[key] = removeDiacritics(_get(user, key, '')))
  )
  return obj
}

export const filterItems = (
  users = [],
  filters,
  searchKeys,
  options = {}
) => {
  const { search = '', ...otherFilters } = filters
  const removeUsersDiacriticsAndFilter = createSelector(
    (users) => users,
    (users, otherFilters) => otherFilters,
    (users, otherFilters) => {
      return users.reduce(function (prev, next) {
          prev.push({
            ...next,
            searchData: searchDataMapper(next, searchKeys),
          })
        return prev
      }, [])
    }
  )

  const fuzzySearch = createSelector(
    removeUsersDiacriticsAndFilter,
    (removedUsersDiacritics) => {
      return new FuzzySearch(removedUsersDiacritics, searchKeys, options)
    }
  )

  return fuzzySearch(users, otherFilters, searchKeys).search(
    removeDiacritics(search.trim())
  )
}