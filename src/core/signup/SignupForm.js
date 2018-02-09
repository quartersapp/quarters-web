import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate'
import { flowRight } from 'lodash'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { login, loginSuccess } from 'common/auth'
import { isEmail } from './validators'
import Input from './Input'
import { graphql } from 'react-apollo'
import { unexpectedError } from 'common/errors'

class SignupForm extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    unexpectedError: PropTypes.func.isRequired
  }

  handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      await this.props.mutate({ variables: { input: values } })
      const token = await login(values.email, values.password)
      setSubmitting(false)
      this.props.loginSuccess(token)
    } catch (err) {
      setSubmitting(false)
      if (err.graphQLErrors && err.graphQLErrors.some(err => err.message === 'A user with that email already exists')) {
        setErrors({ email: 'There already exists a user with that email' })
      } else {
        this.props.unexpectedError(err)
      }
    }
  }

  render () {
    return (
      <Formik
        onSubmit={this.handleSubmit}

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
    )
  }
}

export default flowRight([
  graphql(gql`
    mutation createHostUser ($input: CreateHostUserInput!) {
      createHostUser(input: $input) {
        user { name, email }
      }
    }
  `),
  connect(null, {
    loginSuccess,
    unexpectedError
  })
])(SignupForm)
