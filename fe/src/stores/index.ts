import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import createHistory from 'history/createBrowserHistory'

import { createBrowserHistory } from 'history'

import createRootReducer from '../reducers'
export const history = createBrowserHistory()

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  return store
}

