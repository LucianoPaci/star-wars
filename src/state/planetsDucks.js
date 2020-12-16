import axios from 'axios'

const baseUrl = 'https://swapi.dev/api'

const initialState = {
  planetsList: [],
  offset: 1
}

const FETCH_LIST = 'planet/FETCH_LIST'
const FETCH_LIST_SUCCESSFUL = 'planet/FETCH_LIST_SUCCESSFUL'
const FETCH_LIST_FAILED = 'planet/FETCH_LIST_FAILED'

export default function planetsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST:
      return state
    case FETCH_LIST_SUCCESSFUL:
      return {
        ...state,
        planetsList: action.payload,
      }
    case FETCH_LIST_FAILED:
      return state
    default:
      return state
  }
}

// actions

export const fetchList = () => async (dispatch, getState) => {

  const {offset} = getState().planets
  try {
    const res = await axios.get(`${baseUrl}/planets/?page=${offset}`)
    dispatch({
      type: FETCH_LIST_SUCCESSFUL,
      payload: res.data.results,
    })
  } catch (error) {
    console.log(error)
  }
}
