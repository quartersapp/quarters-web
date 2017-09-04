import { createSelector } from 'reselect'
import {
  combineValidators,
  isRequired
} from 'revalidate'
import { createFormValuesSelector } from 'common/form'
import { LOGIN_FORM_NAME } from './constants'

const validator = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
})

const errorsSelector = createSelector(createFormValuesSelector(LOGIN_FORM_NAME), validator)

export const formIsValidSelector = createSelector(
  errorsSelector,
  errors => Object.keys(errors).length === 0
)
