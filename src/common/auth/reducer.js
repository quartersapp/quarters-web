import { combineReducers } from 'redux'
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from './types'
import { booleanReducer } from 'common/helpers'

export default combineReducers({
  authenticated: booleanReducer({
    initialState: false,
    true: [LOGIN_SUCCESS],
    false: [LOGIN_ERROR, LOGOUT]
  }),
  loggingIn: booleanReducer({
    initialState: false,
    true: [LOGIN_START],
    false: [LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT]
  }),
  loginError: (state = null, action) => {
    switch (action.type) {
      case LOGIN_ERROR:
        return action.payload.message
      case LOGIN_START:
      case LOGOUT:
        return null
      default:
        return state
    }
  }
})
