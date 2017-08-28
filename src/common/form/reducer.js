import { createReducer } from 'redux-create-reducer'
import Immutable from 'seamless-immutable'
import { keyedReducer } from 'helpers'
import {
  CHANGE_VALUE,
  DESTROY_FORM,
  INITIALIZE_FORM
} from './types'

const formReducer = createReducer(null, {
  [INITIALIZE_FORM] (state, { payload }) {
    return Immutable.static({
      values: payload.initialValues
    })
  },

  [CHANGE_VALUE] (state, { payload }) {
    return Immutable.static.set(state, ['values', payload.field], payload.value)
  }
})

export default keyedReducer('form', INITIALIZE_FORM, DESTROY_FORM)(formReducer)
