import React from 'react'
import { ApolloProvider } from 'react-apollo'

import { Root } from './root'

const App = ({ apolloClient, store }) => (
  <ApolloProvider store={store} client={apolloClient}>
    <Root />
  </ApolloProvider>
)

export default App
