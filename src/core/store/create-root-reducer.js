import { combineReducers } from 'redux'
import { keaReducer } from 'kea'

const commonReducer = keaReducer('common')
const coreReducer = keaReducer('core')

export default ({ apolloReducer }) => combineReducers({
  apollo: apolloReducer,
  common: commonReducer,
  core: coreReducer
})
