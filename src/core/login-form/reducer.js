import { createReducer } from 'redux-create-reducer'
import immutable from 'seamless-immutable'
import {
  CHANGE_VALUE,
  RESET_FORM
} from './types'
const Immutable = immutable.static

const initialState = Immutable({
  email: '',
  password: ''
})

export default createReducer(initialState, {
  [CHANGE_VALUE] (state, { payload }) {
    return Immutable.set(state, payload.field, payload.value)
  },
  [RESET_FORM] (state) {
    return initialState
  }
})
