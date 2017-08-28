/* global localStorage */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'core/App'
import { createStore } from 'core/store'
import { createApolloClient } from 'core/apollo-client'

const authenticated = localStorage.getItem('authToken') !== null

const apolloClient = createApolloClient()
const store = createStore({ apolloClient, authenticated })

const renderApp = AppComponent => {
  return ReactDOM.render(
    <AppContainer>
      <AppComponent store={store} apolloClient={apolloClient} />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('core/App', () => {
    renderApp(require('core/App').default)
  })
}
