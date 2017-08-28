import { combineReducers } from 'redux'

import { reducer as auth } from 'common/auth'
import { reducer as loginForm } from 'core/login-form'

export default combineReducers({
  auth,
  loginForm
})
