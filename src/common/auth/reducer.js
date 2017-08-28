/* global localStorage */

import { createReducer } from 'redux-create-reducer'
import immutable from 'seamless-immutable'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from './types'
const Immutable = immutable.static

const tokenInState = localStorage.getItem('authToken')

const initialState = Immutable({
  authenticated: !!tokenInState,
  loggingIn: false,
  loginError: null
})

export default createReducer(initialState, {
  [LOGIN_REQUEST] (state) {
    return Immutable.merge(state, {
      loggingIn: true,
      loginError: null
    })
  },
  [LOGIN_SUCCESS] (state, { payload }) {
    return Immutable.merge(state, {
      authenticated: true,
      loggingIn: false
    })
  },
  [LOGIN_ERROR] (state, { payload: error }) {
    return Immutable.merge(state, {
      loggingIn: false,
      loginError: error.message
    })
  },
  [LOGOUT] (state, { payload: error }) {
    return Immutable.merge(state, {
      authenticated: false,
      loggingIn: false,
      loginError: null
    })
  }
})
