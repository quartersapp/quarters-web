import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { combineValidators, isRequired } from 'revalidate'
import { loggingInSelector, loginErrorSelector, loginRequest } from 'common/auth'
import { Formik, Form, Field } from 'formik'

const LoginForm = ({ loginRequest, submitting, error }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={combineValidators({
      email: isRequired('Email'),
      password: isRequired('Password')
    })}
    onSubmit={({ email, password }) => loginRequest(email, password)}
    render={({ handleSubmit, isValid }) => (
      <Form>
        <h3>Login</h3>
        <Field name='email' type='text' placeholder='email' />
        <br />
        <Field name='password' type='password' placeholder='password' />
        <br />
        <button type='submit' disabled={!isValid || submitting}>Login</button>
        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </Form>
    )}
  />
)

export default connect(
  createStructuredSelector({
    submitting: loggingInSelector,
    error: loginErrorSelector
  }),
  {
    loginRequest: loginRequest
  }
)(LoginForm)
