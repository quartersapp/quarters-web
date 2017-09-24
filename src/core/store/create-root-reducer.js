import { combineReducers } from 'redux'
import { keaReducer } from 'kea'

import formReducer from './form-reducer'

const commonReducer = keaReducer('common')

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  common: commonReducer,
  form: formReducer
})
