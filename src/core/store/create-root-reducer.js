import { combineReducers } from 'redux'
import { reducer as auth } from 'common/auth'

export default () => combineReducers({
  auth
})
