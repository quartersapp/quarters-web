import { combineReducers } from 'redux'
import * as auth from 'common/auth'

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  auth: auth.reducer
})
