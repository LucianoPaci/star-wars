import axios from 'axios'
import adapt from '../utils/adapt'

const baseUrl = 'https://swapi.dev/api'

const initialState = {
  planetsList: [],
  planetsById: [],
  loading: false,
  error: false
}

// types

const FETCH_LIST = 'planet/FETCH_LIST'
const FETCH_LIST_SUCCESSFUL = 'planet/FETCH_LIST_SUCCESSFUL'
const FETCH_LIST_FAILED = 'planet/FETCH_LIST_FAILED'

// reducer

export default function planetsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_LIST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        error: false,
        // Save list of planets by Pagination
        paginatedPlanetsList: {
          ...state.paginatedPlanetsList,
          [action.meta.pagination]: action.payload.results
        },
        planetsList: {
          ...state.planetsList,
          ...action.payload.results
        },
        planetsById: {
          ...state?.planetsById,
          ...adapt(action.payload.results)
        },
        next: action.payload.next,
        count: action.payload.count
      }
    case FETCH_LIST_FAILED:
      return {
        ...state,
        error: true,
        loading: false
      }
    default:
      return state
  }
}

// actions

export const fetchList = (offset = 1) => async (dispatch, getState) => {
  try {
    dispatch(fetchListLoading())
    const res = await axios.get(`${baseUrl}/planets/?page=${offset}`)
    dispatch({
      type: FETCH_LIST_SUCCESSFUL,
      payload: res.data,
      meta: {
        pagination: offset
      }
    })
  } catch (error) {
    dispatch(fetchListFailed(error))
  }
}

const fetchListLoading = () => async (dispatch) => {
  dispatch({
    type: FETCH_LIST,
  })
}

const fetchListFailed = (error) => async (dispatch) => {
  dispatch({
    type: FETCH_LIST_FAILED,
    payload: error,
  })
}
