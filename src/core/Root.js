import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { authenticatedSelector, logout } from 'common/auth'
import { LoginForm } from 'core/login-form'
import Router from './Router'

const TempLoginHandler = connect(
  createStructuredSelector({
    authenticated: authenticatedSelector
  }),
  { logout }
)(class extends Component {
  handleLogoutButtonClick = e => {
    e.preventDefault()
    this.props.logout()
  }

  render () {
    if (this.props.authenticated) {
      return (
        <button type='button' onClick={this.handleLogoutButtonClick}>
          Logout
        </button>
      )
    } else {
      return <LoginForm />
    }
  }
})

const Root = () => (
  <div>
    <h2>Quarters</h2>
    <TempLoginHandler />
    <hr />
    <Router />
  </div>
)

export default Root
