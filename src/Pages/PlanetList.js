import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'
import Card from '../components/ActionCard'
import { fetchList } from '../state/planetsDucks'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import SearchInput from '../components/SearchInput'
import { filterItems } from '../utils/filterDiacritics'
import DisplayCard from '../components/DisplayCard'

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: -30,
    position: 'fixed',
    bottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      margin: 0,
    },
  },
  content: {
    height: 550,
    [theme.breakpoints.down('xs')]: {
      height: 550,
      justifyContent: 'center',
    },
  },
  searchBar:  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  }
}))

function PlanetList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchPlanetText, setSearchPlanetText] = useState('')
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    loading,
    count,
    error,
    planetsList,
    planetsById,
    paginatedPlanetsList,
  } = useSelector((store) => store.planets)

  const currentPlanets = useMemo(() => {
    if (!loading && !error) {
      return paginatedPlanetsList[currentPage]
    }
  }, [error, loading, paginatedPlanetsList, currentPage])

  useEffect(() => {
    if (!loading && !error && !currentPlanets?.length > 0) {
      dispatch(fetchList(currentPage))
    }
  }, [currentPage, error, currentPlanets, dispatch, loading, planetsList])

  const handlePaginationClick = useCallback((event, number) => {
    setCurrentPage(number)
  }, [])

  const handleOnClick = useCallback(
    (name) => {
      history.push(`/planets/${name}`)
    },
    [history]
  )

  const displayedItems = useMemo(() => {
    if (planetsList && planetsById) {
      let filteredItems = currentPlanets
      if (searchPlanetText) {
        const possiblePlanets = Object.keys(planetsById).map((planetKey) => {
          console.log('planetKey', planetKey)
          return planetsById[planetKey]
        })
        filteredItems = possiblePlanets
        filteredItems = filterItems(
          filteredItems,
          { search: searchPlanetText },
          ['name']
        )
      }

      return filteredItems?.map((item) => (
        <Grid item xs={5} key={item.name}>
          <Card
            data={item}
            name={item.name}
            onClickCard={handleOnClick}
            hint={`Click to see ${item.name} inhabitants`}
            content={`Climate: ${item.climate}`}
          />
        </Grid>
      ))
    }
  }, [
    currentPlanets,
    handleOnClick,
    planetsById,
    planetsList,
    searchPlanetText,
  ])

  return (
    <>
      <div id='search-input' className={classes.searchBar}>
        {!error &&  <SearchInput
          placeholder='Search Planet'
          onChange={setSearchPlanetText}
        />}
       
      </div>
      <div className={classes.content}>
        <Grid container justify='space-evenly' alignItems='center'>
        {searchPlanetText && !displayedItems?.length ? (
          <DisplayCard title="No results were found"/>
        ) : displayedItems ? (
            <>{displayedItems}</>
            ) : (
              <Grid item>
            <CircularProgress /> 

          </Grid>
        )}
        </Grid>
      </div>
      <div className={classes.footer}>
        <Pagination
          count={count / 10}
          color='secondary'
          onChange={handlePaginationClick}
        />
      </div>
    </>
  )
}

export default PlanetList
