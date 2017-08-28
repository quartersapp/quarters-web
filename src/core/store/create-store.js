import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './create-root-reducer'
import rootSaga from './root-saga'

export default ({ apolloClient }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const apolloReducer = apolloClient.reducer()

  const store = createStore(
    createRootReducer({ apolloReducer }),
    undefined,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        apolloClient.middleware()
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./create-root-reducer', () => {
      const newReducer = require('./create-root-reducer').default({ apolloReducer })
      store.replaceReducer(newReducer)
    })
  }

  return store
}
