import React from 'react'

import { authenticatedSelector, logout } from 'common/auth'
import { LoginForm } from 'core/login-form'
import Router from './Router'
import { Redux } from 'common/components'

const TempLoginHandler = () => (
  <Redux actions={{ logout }} selector={authenticatedSelector}>
    {({ actions: { logout }, state: authenticated }) => {
      if (authenticated) {
        return (
          <button type='button' onClick={e => {
            e.preventDefault()
            logout()
          }}>
            Logout
          </button>
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
