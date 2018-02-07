import { actions, reducer, selectors } from './logic'

export { reducer }
export const {
  loginRequest,
  loginSuccess,
  logout
} = actions
export const {
  authenticatedSelector,
  loggingInSelector,
  loginErrorSelector
} = selectors
export { default as saga, login } from './saga'
