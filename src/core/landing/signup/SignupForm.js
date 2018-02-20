import React from 'react'
import { createStructuredSelector } from 'reselect'
import { Formik, Form, Field } from 'formik'
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate'
import { isEmail } from './validators'
import { actions, selectors } from './logic'
import { Redux } from 'common/components'

const SignupForm = () => (
  <div>
    <h2>Sign up</h2>
    <Redux
      actions={actions}
      selector={createStructuredSelector({
        submitting: selectors.submittingSelector,
        submitError: selectors.submitErrorSelector
      })}
    >
      {({ actions: { submitRequest }, state: { submitting, submitError } }) => (
        <Formik
          onSubmit={submitRequest}

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
        >
          {({ isValid }) => (
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
          )}
        </Formik>
      )}
    </Redux>
  </div>
)

export default SignupForm
