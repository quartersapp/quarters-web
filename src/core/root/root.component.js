import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { authenticatedSelector, logout } from 'common/auth'
import { LoginForm } from 'core/login-form'
import CurrentUser from './current-user.component'

class Root extends Component {
  handleLogoutButtonClick = e => {
    e.preventDefault()
    this.props.logout()
  }

  render () {
    if (this.props.authenticated) {
      return (
        <div>
          <CurrentUser />
          <button type='button' onClick={this.handleLogoutButtonClick}>
            Logout
          </button>
        </div>
      )
    } else {
      return <LoginForm />
    }
  }
}

export default connect(
  createStructuredSelector({
    authenticated: authenticatedSelector
  }),
  { logout }
)(Root)