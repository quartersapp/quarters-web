import { createReducer } from 'redux-create-reducer'
import Immutable from 'seamless-immutable'
import { keyedReducer } from 'common/helpers'
import {
  CHANGE_FORM_VALUE,
  DESTROY_FORM,
  INITIALIZE_FORM
} from './types'

export const formReducer = createReducer(null, {
  [INITIALIZE_FORM] (state, { payload }) {
    return Immutable.static({
      values: payload.initialValues
    })
  },

  [CHANGE_FORM_VALUE] (state, { payload }) {
    return Immutable.static.setIn(state, ['values', payload.field], payload.value)
  }
})

export default keyedReducer('form', INITIALIZE_FORM, DESTROY_FORM)(formReducer)
