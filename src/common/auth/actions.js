import { createAction } from 'redux-actions'
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from './types'

export const loginRequest = createAction(LOGIN_REQUEST, (email, password) => {
  return { email, password }
})

export const loginSuccess = createAction(LOGIN_SUCCESS, token => {
  return { token }
})

export const loginError = createAction(LOGIN_ERROR)
export const logout = createAction(LOGOUT)
