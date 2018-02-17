import { combineReducers } from 'redux'
import { reducer as auth } from 'common/auth'
import * as signup from 'core/signup'

export default () => combineReducers({
  auth,
  signup: signup.reducer
})
