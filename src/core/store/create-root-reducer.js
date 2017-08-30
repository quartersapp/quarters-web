import { combineReducers } from 'redux'

import { reducer as auth } from 'common/auth'
import { reducer as form } from 'common/form'

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  auth,
  form
})
