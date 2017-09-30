import { combineReducers } from 'redux'
import { keaReducer } from 'kea'
import { logic as auth } from 'common/auth'

const coreReducer = keaReducer('core')

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  auth: auth.reducer,
  core: coreReducer
})
