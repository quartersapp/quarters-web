import { createSelector } from 'reselect'
import { createFormValuesSelector } from 'common/form'
import { LOGIN_FORM_NAME } from './constants'

const required = (errorMessage = 'This field is required') => value => {
  if (value === null || value === undefined || value === '') {
    return errorMessage
  }
}

const createFormIsValidSelector = (form, validators) => createSelector(
  createFormValuesSelector(form),
  values => {
    return Object.keys(validators).every(fieldName => {
      const value = values[fieldName]
      const validator = validators[fieldName]
      return !validator(value)
    })
  }
)

export const formIsValidSelector = createFormIsValidSelector(LOGIN_FORM_NAME, {
  email: required('Email is required'),
  password: required('Password is required')
})
