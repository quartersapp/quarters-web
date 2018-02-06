import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import Root from './Root'

const App = ({ apolloClient, store }) => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Root />
    </Provider>
  </ApolloProvider>
)

export default App
