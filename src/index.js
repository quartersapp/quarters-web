import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'core/App'
import { createStore } from 'core/store'

const store = createStore()

const renderApp = AppComponent => {
  return ReactDOM.render(
    <AppContainer>
      <AppComponent store={store} />
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
