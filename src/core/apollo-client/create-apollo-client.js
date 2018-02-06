/* global localStorage */

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'

import { API_URL } from 'config'

export default () => {
  const httpLink = new HttpLink({ uri: `${API_URL}/graphql` })

  const middlewareLink = setContext(() => {
    const headers = {}
    // TODO refactor to grab this from redux store
    const token = localStorage.getItem('authToken')

    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    return { headers }
  })

  return new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}
