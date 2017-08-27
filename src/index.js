import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './core/App'

const renderApp = AppComponent => {
  return ReactDOM.render(
    <AppContainer>
      <AppComponent />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./core/App', () => {
    renderApp(require('./core/App').default)
  })
}
