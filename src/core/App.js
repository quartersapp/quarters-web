import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import Router from './Router'

const App = ({ apolloClient, store }) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ApolloProvider>
)

export default App
