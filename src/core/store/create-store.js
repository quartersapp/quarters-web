import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './create-root-reducer'
import rootSaga from './root-saga'

export default ({ apolloClient, authenticated = false }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const apolloReducer = apolloClient.reducer()

  const store = createStore(
    createRootReducer({ apolloReducer }),
    { auth: { authenticated } },
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        apolloClient.middleware()
      )
    )
  )

  sagaMiddleware.run(rootSaga, apolloClient)

  if (module.hot) {
    module.hot.accept('./create-root-reducer', () => {
      const newReducer = require('./create-root-reducer').default({ apolloReducer })
      store.replaceReducer(newReducer)
    })
  }

  return store
}
