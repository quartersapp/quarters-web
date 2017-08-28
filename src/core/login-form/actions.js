import { createAction } from 'redux-actions'
import {
  CHANGE_VALUE,
  RESET_FORM
} from './types'

export const changeValue = createAction(CHANGE_VALUE, (field, value) => {
  return { field, value }
})

export const resetForm = createAction(RESET_FORM)
