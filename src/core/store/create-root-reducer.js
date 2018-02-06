import { combineReducers } from 'redux'
import * as auth from 'common/auth'
import * as signup from 'core/signup'

export default () => combineReducers({
  auth: auth.reducer,
  signup: signup.reducer
})
