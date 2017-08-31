import { createReducer } from 'redux-create-reducer'
import Immutable from 'seamless-immutable'
import { keyedReducer } from 'common/helpers'
import {
  CHANGE_FORM_VALUE,
  DESTROY_FORM,
  INITIALIZE_FORM,
  RENAME_FORM
} from './types'

const initialState = Immutable.static({
  values: {}
})

export const formReducer = createReducer(initialState, {
  [CHANGE_FORM_VALUE] (state, { payload }) {
    return Immutable.static.setIn(state, ['values', payload.field], payload.value)
  }
})

export default keyedReducer('form', INITIALIZE_FORM, DESTROY_FORM, RENAME_FORM)(formReducer)
