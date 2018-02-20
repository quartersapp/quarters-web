import { combineReducers } from 'redux'
import { reducer as auth } from 'common/auth'
import { reducer as signup } from 'core/landing'

export default () => combineReducers({
  auth,
  signup
})
