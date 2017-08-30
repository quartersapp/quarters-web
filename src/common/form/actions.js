import { createAction } from 'redux-actions'

import { CHANGE_FORM_VALUE, INITIALIZE_FORM, DESTROY_FORM } from './types'

export const changeFormValue = createAction(
  CHANGE_FORM_VALUE,
  (formName, field, value) => {
    return { form: formName, field, value }
  }
)

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (formName, initialValues = {}) => {
    return { form: formName, initialValues }
  }
)

export const destroyForm = createAction(
  DESTROY_FORM,
  (formName) => {
    return { form: formName }
  }
)
