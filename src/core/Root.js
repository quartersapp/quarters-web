import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { authenticatedSelector, logout } from 'common/auth'
import { LoginForm } from 'core/login-form'
import Router from './Router'
import { Redux } from 'common/components'

const currentUserQuery = gql`
  query CurrentUser {
    currentUser { email }
  }
`

const TempLoginHandler = () => (
  <Redux actions={{ logout }} selector={authenticatedSelector}>
    {({ actions: { logout }, state: authenticated }) => {
      if (authenticated) {
        return (
          <div>
            <Query query={currentUserQuery}>
              {({ data }) => (
                data ? <div>Hello, {data.currentUser.email}</div> : null
              )}
            </Query>
            <button type='button' onClick={e => {
              e.preventDefault()
              logout()
            }}>
              Logout
            </button>
          </div>
        )
      } else {
        return <LoginForm />
      }
    }}
  </Redux>
)

const Root = () => (
  <div>
    <h2>Quarters</h2>
    <TempLoginHandler />
    <hr />
    <Router />
  </div>
)

export default Root
