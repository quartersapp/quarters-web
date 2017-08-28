import { createAction } from 'redux-actions'

import { CHANGE_FORM_VALUE, INITIALIZE_FORM, DESTROY_FORM } from './types'

export const changeFormValue = createAction(
  CHANGE_FORM_VALUE,
  (form, field, value) => {
    return { form, field, value }
  }
)

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form, initialValues = {}) => {
    return { form, initialValues }
  }
)

export const destroyForm = createAction(
  DESTROY_FORM,
  form => {
    return { form }
  }
)
