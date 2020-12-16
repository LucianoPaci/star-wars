import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import * as reducers from './reducers'
import loggerMiddleware from './middlewares/logger'

import planetsReducer from './planetsDucks'


export default function configureStore(initialState) {
    const rootReducer = combineReducers({
        planets: planetsReducer
    })
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )


}