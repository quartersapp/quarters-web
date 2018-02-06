import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate'
import { isEmail } from './validators'
import { createStructuredSelector } from 'reselect'
import { actions, selectors } from './logic'

const SignupPage = ({ submitting, submitRequest, submitError }) => (
  <div>
    <h2>Sign up</h2>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }}

      validate={combineValidators({
        firstName: composeValidators(
          isRequired,
          hasLengthBetween(1, 50)
        )('First name'),
        lastName: composeValidators(
          isRequired,
          hasLengthBetween(1, 50)
        )('Last name'),
        email: composeValidators(
          isRequired,
          isEmail
        )('Email'),
        password: composeValidators(
          isRequired,
          hasLengthBetween(6, 72)
        )('Password')
      })}

      onSubmit={submitRequest}

      render={({ isValid }) => (
        <Form>
          <Field name='firstName' placeholder='first name' />
          <br />
          <Field name='lastName' placeholder='last name' />
          <br />
          <Field name='email' placeholder='email' />
          <br />
          <Field name='password' placeholder='password' />
          <br />
          <button type='submit' disabled={!isValid || submitting}>Sign up</button>
          {submitError && (
            <p style={{ color: 'red' }}>
              {submitError}
            </p>
          )}
        </Form>
      )} />
  </div>
)

export default connect(
  createStructuredSelector({
    submitting: selectors.submitting,
    submitError: selectors.submitError
  }),
  { submitRequest: actions.submitRequest }
)(SignupPage)
