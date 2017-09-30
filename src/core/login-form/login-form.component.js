import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logic as authLogic } from 'common/auth'
import loginFormLogic from './logic'

class LoginForm extends Component {
  componentWillUnmount () {
    this.props.reset()
  }

  render () {
    const { submitting, error, valid, values, loginRequest, changeValue } = this.props

    return (
      <form onSubmit={e => {
        e.preventDefault()
        loginRequest(values.email, values.password)
      }}>
        <h3>Login</h3>
        <input
          type='text'
          placeholder='email'
          name='email'
          disabled={submitting}
          value={values.email}
          onChange={e => {
            e.preventDefault()
            changeValue('email', e.target.value)
          }}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          name='password'
          disabled={submitting}
          value={values.password}
          onChange={e => {
            e.preventDefault()
            changeValue('password', e.target.value)
          }}
        />
        <button type='submit' disabled={!valid || submitting}>Login</button>
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
    submitting: authLogic.selectors.loggingIn,
    loginError: authLogic.selectors.loginError,
    values: loginFormLogic.selectors.values,
    valid: loginFormLogic.selectors.valid
  }),
  {
    loginRequest: authLogic.actions.loginRequest,
    reset: loginFormLogic.actions.reset,
    changeValue: loginFormLogic.actions.changeValue
  }
)(LoginForm)
