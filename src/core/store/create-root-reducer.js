import { combineReducers } from 'redux'
import loginForm from 'core/login-form/logic'

import { logic as auth } from 'common/auth'

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  auth: auth.reducer,
  loginForm: loginForm.reducer
})
