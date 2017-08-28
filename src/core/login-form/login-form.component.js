import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

import {
  loginRequest,
  loggingInSelector,
  loginErrorMessageSelector
} from 'common/auth'

import { createForm, formValueSelector } from 'common/form'

import { FORM_NAME } from './types'
import { changeValue, resetForm } from './actions'

const Form = createForm('login')

const LoginForm = ({ handleLogin }) => (
  <Form handleLogin={handleLogin}>
    <h3>Login</h3>
    <Input type='text' placeholder='email' name='email' disabled={submitting} />
    <Input type='password' placeholder='password' name='password' disabled={submitting} />
    <br />
    <input
      name='password'
      placeholder='Password'
      type='password'
      onChange={handleChangeValue('password')}
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
  </Form>
)

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

    return
  }
}

export default compose(

)(LoginForm)

export default connect(
  createStructuredSelector({
    email: formValueSelector(FORM_NAME, 'email'),
    password: formValueSelector(FORM_NAME, 'password'),
    submitting: loggingInSelector,
    error: loginErrorMessageSelector
  }),
  { changeValue, loginRequest, resetForm }
)(LoginForm)
