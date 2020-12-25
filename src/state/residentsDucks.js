import axios from 'axios'

const baseUrl = 'https://swapi.dev/api'

const initialState = {
  residentsList: [],
  planetName: '',
  residentName: '',
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

const FETCH_RESIDENT = 'resident/FETCH_RESIDENT'
const FETCH_RESIDENT_SUCCESSFUL = 'resident/FETCH_RESIDENT_SUCCESSFUL'
const FETCH_RESIDENT_FAILED = 'resident/FETCH_RESIDENT_FAILED'

const SELECT_PLANET = 'resident/SELECT_PLANET'
const SELECT_RESIDENT = 'resident/SELECT_RESIDENT'

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
        residentsList: action.payload,
        planetName: action.meta.planetName,
        [action.meta.planetName]: {
          residents: action.payload,
        },
        loading: false,
      }
    case FETCH_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

      case SELECT_RESIDENT:
      return {
        ...state,
        residentName: action.payload,
      }

    case FETCH_RESIDENT:
      return {
        ...state,
        loading: true,
      }
    case FETCH_RESIDENT_SUCCESSFUL: {
      return {
        ...state,
        resident: action.payload.results && action.payload.results[0],
        loading: false,
      }
    }
    case FETCH_RESIDENT_FAILED: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
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
      payload: res.map((each) => each?.data),
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

// SELECT PLANET

export const selectPlanet = (planet) => (dispatch) => {
  dispatch({
    type: SELECT_PLANET,
    payload: planet,
  })
}

// SELECT RESIDENT

export const selectResident = (resident) => (dispatch) => {
  dispatch({
    type: SELECT_RESIDENT,
    payload: resident,
  })
}

// FETCH RESIDENT

export const fetchResident = (name) => async (dispatch) => {
  try {
    dispatch(fetchResidentLoading())
    const res = await axios.get(
      `${baseUrl}/people/?search=${encodeURIComponent(name)}`
    )

    dispatch({
      type: FETCH_RESIDENT_SUCCESSFUL,
      payload: res.data,
    })
  } catch (error) {
    dispatch(fetchResidentFailed(error))
  }
}

const fetchResidentLoading = () => async (dispatch) => {
  dispatch({
    type: FETCH_RESIDENT,
  })
}

const fetchResidentFailed = (error) => async (dispatch) => {
  dispatch({
    type: FETCH_RESIDENT_FAILED,
    payload: error,
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
