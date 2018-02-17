import React from 'react'
import { Formik, Form, Field } from 'formik'
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate'
import { isEmail } from './validators'
import gql from 'graphql-tag'
import { login, loginSuccess } from 'common/auth'
import { Redux, Mutation } from 'common/components'

const Input = props => {
  const { type, field, form: { touched, errors }, ...otherProps } = props
  return (
    <span>
      <input {...field} {...otherProps} />
      {touched[field.name] && errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
    </span>
  )
}

const SignupPage = () => (
  <div>
    <h2>Sign up</h2>
    <Redux actions={{ loginSuccess }}>
      {({ actions }) => (
        <Mutation mutation={gql`
          mutation createHostUser ($input: CreateHostUserInput!) {
            createHostUser(input: $input) {
              user { name, email }
            }
          }
        `} >
          {({ mutate, data, errors }) => (
            <Formik
              onSubmit={async (values, { setErrors, setSubmitting }) => {
                try {
                  await mutate({ variables: { input: values } })
                  const token = await login(values.email, values.password)
                  setSubmitting(false)
                  actions.loginSuccess(token)
                } catch (err) {
                  if (err.graphQLErrors && err.graphQLErrors.some(err => err.message === 'A user with that email already exists')) {
                    setErrors({ email: 'There already exists a user with that email' })
                  } else {
                    console.error(err) // TODO call global error handler
                  }
                  setSubmitting(false)
                }
              }}

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
              {({ isValid, isSubmitting }) => (
                <Form>
                  <Field name='firstName' placeholder='first name' component={Input} />
                  <br />
                  <Field name='lastName' placeholder='last name' component={Input} />
                  <br />
                  <Field name='email' placeholder='email' component={Input} />
                  <br />
                  <Field name='password' placeholder='password' component={Input} />
                  <br />
                  <button type='submit' disabled={!isValid || isSubmitting}>Sign up</button>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      )}
    </Redux>
  </div>
)

export default SignupPage
