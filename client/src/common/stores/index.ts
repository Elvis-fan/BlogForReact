import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import reducers from 'src/common/reducers'
import rootSaga from 'src/sagas'
const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const middleware = routerMiddleware(history)
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const stores = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(middleware, sagaMiddleware),
))
sagaMiddleware.run(rootSaga)
export {
    history, stores,
}
