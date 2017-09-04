import { combineReducers } from 'redux'

import { reducer as auth } from 'common/auth'
import formReducer from './form-reducer'

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  auth,
  form: formReducer
})
