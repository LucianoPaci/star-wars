import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import * as reducers from './reducers'
import loggerMiddleware from './middlewares/logger'

import planetsReducer from './planetsDucks'

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup

export default function configureStore(initialState) {
  const rootReducer = combineReducers({
    planets: planetsReducer,
  })

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )

  return createStore(rootReducer, initialState, enhancer)
}
