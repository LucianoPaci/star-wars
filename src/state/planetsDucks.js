import axios from 'axios'

const baseUrl = 'https://swapi.dev/api'

const initialState = {
  planets: []
}

const FETCH_LIST = 'planet/FETCH_LIST'
const FETCH_LIST_SUCCESSFUL = 'planet/FETCH_LIST_SUCCESSFUL'
const FETCH_LIST_FAILED = 'planet/FETCH_LIST_FAILED'

export default function planetsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST:
      return
    case FETCH_LIST_SUCCESSFUL:
      return {
        ...state,
        planets: action.payload,
      }
    case FETCH_LIST_FAILED:
      return
    default:
      return state
  }
}

// actions

export const fetchList = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/planets/?page=1`)
    dispatch({
      type: FETCH_LIST_SUCCESSFUL,
      payload: res.data.results,
    })
  } catch (error) {
    console.log(error)
  }
}
