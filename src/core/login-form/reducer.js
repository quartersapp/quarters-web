import { createReducer } from 'redux-create-reducer'
import Immutable from 'seamless-immutable'
import {
  CHANGE_VALUE,
  RESET_FORM
} from './types'

const initialState = Immutable.from({
  email: '',
  password: ''
})

export default createReducer(initialState, {
  [CHANGE_VALUE] (state, { payload }) {
    return Immutable.static.set(state, payload.field, payload.value)
  },

  [RESET_FORM] (state) {
    return initialState
  }
})
