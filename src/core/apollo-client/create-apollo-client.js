/* global localStorage */

import { ApolloClient, InMemoryCache } from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { DedupLink } from 'apollo-link-dedup'

import { API_URL } from 'config'

export default () => {
  const httpLink = new BatchHttpLink({ uri: `${API_URL}/graphql` })
  const dedupLink = new DedupLink()

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
    link: middlewareLink.concat(dedupLink).concat(httpLink),
    cache: new InMemoryCache()
  })
}
