import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { authenticatedSelector, logout } from 'common/auth'
import { LoginForm } from 'core/login-form'

const Root = ({ authenticated, logout }) => {
  if (authenticated) {
    return (
      <button type='button' onClick={logout}>
        Logout
      </button>
    )
  } else {
    return <LoginForm />
  }
}

export default connect(
  createStructuredSelector({
    authenticated: authenticatedSelector
  }),
  { logout }
)(Root)
