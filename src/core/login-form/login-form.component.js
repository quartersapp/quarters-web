import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  loginRequest,
  loggingInSelector,
  loginErrorMessageSelector
} from 'common/auth'

import {
  emailSelector,
  passwordSelector
} from './selectors'
import { changeValue, resetForm } from './actions'

class LoginForm extends Component {
  componentWillUnmount () {
    this.props.resetForm()
  }

  handleLogin = e => {
    e.preventDefault()

    const { email, password, loginRequest } = this.props
    loginRequest(email, password)
  }

  handleChangeValue = field => e => {
    this.props.changeValue(field, e.target.value)
  }

  render () {
    const { email, password, submitting, error } = this.props

    return (
      <form onSubmit={this.handleLogin}>
        <h3>Login</h3>
        <input
          name='email'
          placeholder='Email'
          type='text'
          onChange={this.handleChangeValue('email')}
          value={email}
          disabled={submitting}
        />
        <br />
        <input
          name='password'
          placeholder='Password'
          type='password'
          onChange={this.handleChangeValue('password')}
          value={password}
          disabled={submitting}
        />
        <br />
        <button type='submit' disabled={submitting}>Login</button>
        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </form>
    )
  }
}

export default connect(
  createStructuredSelector({
    email: emailSelector,
    password: passwordSelector,
    submitting: loggingInSelector,
    error: loginErrorMessageSelector
  }),
  { changeValue, loginRequest, resetForm }
)(LoginForm)
