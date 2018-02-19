import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './create-root-reducer'
import rootSaga from './root-saga'

export default ({ apolloClient, authenticated = false }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(),
    { auth: { authenticated } },
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware
      )
    )
  )

  let sagaTask = sagaMiddleware.run(function * () {
    yield rootSaga(apolloClient)
  })

  if (module.hot) {
    module.hot.accept('./create-root-reducer', () => {
      const newReducer = require('./create-root-reducer').default()
      store.replaceReducer(newReducer)
    })

    module.hot.accept('./root-saga', () => {
      const newRootSaga = require('./root-saga').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function * replacedSaga (action) {
          yield newRootSaga(apolloClient)
        })
      })
    })
  }

  return store
}
