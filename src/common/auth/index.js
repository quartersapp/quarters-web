import { actions, reducer, selectors } from './logic'

export { reducer }
export const {
  loginRequest,
  logout
} = actions
export const {
  authenticatedSelector,
  loggingInSelector,
  loginErrorSelector
} = selectors
export { default as saga } from './saga'
