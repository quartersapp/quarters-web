import { createAction } from 'redux-actions'

import { CHANGE_FORM_VALUE, REGISTER_FORM, DEREGISTER_FORM } from './types'

export const changeFormValue = createAction(
  CHANGE_FORM_VALUE,
  (formName, field, value) => {
    return { form: formName, field, value }
  }
)

export const registerForm = createAction(
  REGISTER_FORM,
  (formName, initialValues = {}) => {
    return { form: formName, initialValues }
  }
)

export const deregisterForm = createAction(
  DEREGISTER_FORM,
  (formName) => {
    return { form: formName }
  }
)
