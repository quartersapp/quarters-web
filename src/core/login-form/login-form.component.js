import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { createForm, connectField } from 'common/form'
import {
  loginRequest,
  loggingInSelector,
  loginErrorMessageSelector
} from 'common/auth'
import { LOGIN_FORM_NAME } from './constants'
import { formIsValidSelector } from './selectors'

const Form = createForm(LOGIN_FORM_NAME)
const Input = connectField('input')

const LoginForm = ({ loginRequest, submitting, error, valid }) => (
  <Form onSubmit={({ email, password }) => loginRequest(email, password)}>
    <h3>Login</h3>
    <Input
      type='text'
      placeholder='email'
      name='email'
      disabled={submitting}
    />
    <br />
    <Input type='password' placeholder='password' name='password' disabled={submitting} />
    <button type='submit' disabled={!valid || submitting}>Login</button>
    {error && (
      <p style={{ color: 'red' }}>
        {error}
      </p>
    )}
  </Form>
)

export default connect(
  createStructuredSelector({
    valid: formIsValidSelector,
    submitting: loggingInSelector,
    error: loginErrorMessageSelector
  }),
  { loginRequest }
)(LoginForm)
