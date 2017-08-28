/* global localStorage */

import { ApolloClient, createNetworkInterface } from 'react-apollo'

import { API_URL } from 'config'

export default () => {
  const networkInterface = createNetworkInterface({ uri: `${API_URL}/graphql` })
  networkInterface.use([{
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      const token = localStorage.getItem('authToken')

      if (token) {
        req.options.headers.authorization = `Bearer ${token}`
      }

      next()
    }
  }])

  return new ApolloClient({ networkInterface })
}
