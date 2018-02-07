import React from 'react'
import { createStructuredSelector } from 'reselect'
import { combineValidators, isRequired } from 'revalidate'
import { loggingInSelector, loginErrorSelector, loginRequest } from 'common/auth'
import { Formik, Form, Field } from 'formik'
import { Redux } from 'common/components'

const LoginForm = () => (
  <Redux
    actions={{ loginRequest }}
    selector={createStructuredSelector({
      submitting: loggingInSelector,
      error: loginErrorSelector
    })}
  >
    {({ actions: { loginRequest }, state: { submitting, error } }) => (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={combineValidators({
          email: isRequired('Email'),
          password: isRequired('Password')
        })}
        onSubmit={({ email, password }) => loginRequest(email, password)}
      >
        {({ handleSubmit, isValid }) => (
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
      </Formik>
    )}
  </Redux>
)

export default LoginForm
