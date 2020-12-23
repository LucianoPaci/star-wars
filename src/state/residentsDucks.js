import axios from 'axios'

const baseUrl = 'https://swapi.dev/api'

const initialState = {
  residentsList: [],
  planetName: null,
  loading: false,
  error: null,
}

// types

const FETCH_LIST = 'resident/FETCH_LIST'
const FETCH_LIST_SUCCESSFUL = 'resident/FETCH_LIST_SUCCESSFUL'
const FETCH_LIST_FAILED = 'resident/FETCH_LIST_FAILED'

const FETCH_PLANET = 'resident/FETCH_PLANET'
const FETCH_PLANET_SUCCESSFUL = 'resident/FETCH_PLANET_SUCCESSFUL'
const FETCH_PLANET_FAILED = 'resident/FETCH_PLANET_FAILED'

const SELECT_PLANET = 'resident/SELECT_PLANET'

// reducer

export default function residentReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PLANET:
      return {
        ...state,
        planetName: action.payload,
      }
    case FETCH_PLANET:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PLANET_SUCCESSFUL:
      return {
        ...state,
        planet: action.payload.results && action.payload.results[0],
        loading: false,
        error: null,
      }
    case FETCH_PLANET_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case FETCH_LIST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_LIST_SUCCESSFUL:
      return {
        ...state,
        residentsList: action.payload,
        planetName: action.meta.planetName,
        [action.meta.planetName]: {
          residents: action.payload
        },
        loading: false,
      }
    case FETCH_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

// actions

// FETCH LIST

export const fetchList = (planet) => async (dispatch) => {
  try {
    dispatch(fetchListLoading())
    const res = await multipleUrlCalls(planet.residents)
    dispatch({
      type: FETCH_LIST_SUCCESSFUL,
      meta: {
        planetName: planet.name,
      },
      payload: res.map(each => each?.data)
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

// FETCH PLANET

export const fetchPlanet = (planetName) => async (dispatch) => {
  try {
    dispatch(fetchPlanetLoading())
    const res = await axios.get(
      `${baseUrl}/planets/?search=${encodeURIComponent(planetName)}`
    )
    dispatch({
      type: FETCH_PLANET_SUCCESSFUL,
      payload: res.data,
    })
  } catch (error) {
    dispatch(fetchPlanetFailed(error))
  }
}

const fetchPlanetLoading = () => async (dispatch) => {
  dispatch({
    type: FETCH_PLANET,
  })
}

const fetchPlanetFailed = (error) => async (dispatch) => {
  dispatch({
    type: FETCH_PLANET_FAILED,
    payload: error,
  })
}

export const selectPlanet = (planet) => (dispatch) => {
  dispatch({
    type: SELECT_PLANET,
    payload: planet,
  })
}

// Utils


async function multipleUrlCalls(urls) {
  const promises = await Promise.all(
    urls.map((url) => {
      url = url.replace('http', 'https')
      return axios.get(url)
    })
  )
  return promises
}