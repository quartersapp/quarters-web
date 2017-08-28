import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(require('./root-reducer').default)
    })
  }

  return store
}
