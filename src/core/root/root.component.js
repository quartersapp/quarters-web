import React, { Component } from 'react'
import { connect } from 'kea'

import { logic as authLogic } from 'common/auth'
import { LoginForm } from 'core/login-form'
import CurrentUser from './current-user.component'

class Root extends Component {
  handleLogoutButtonClick = e => {
    e.preventDefault()
    this.actions.logout()
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

export default connect({
  actions: [
    authLogic, [
      'logout'
    ]
  ],
  props: [
    authLogic, [
      'authenticated'
    ]
  ]
})(Root)
