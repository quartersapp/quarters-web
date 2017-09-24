import React, { Component } from 'react'
import { connect } from 'kea'
import { logic as authLogic } from 'common/auth'
import loginFormLogic from './logic'

class LoginForm extends Component {
  componentWillUnmount () {
    this.actions.reset()
  }

  render () {
    const { submitting, error, valid, values } = this.props

    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.actions.loginRequest(values.email, values.password)
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
            this.actions.changeValue('email', e.target.value)
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
            this.actions.changeValue('password', e.target.value)
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

export default connect({
  actions: [
    authLogic, [
      'loginRequest'
    ],
    loginFormLogic, [
      'reset',
      'changeValue'
    ]
  ],
  props: [
    authLogic, [
      'loggingIn as submitting',
      'loginError as error'
    ],
    loginFormLogic, [
      'values',
      'valid'
    ]
  ]
})(LoginForm)
