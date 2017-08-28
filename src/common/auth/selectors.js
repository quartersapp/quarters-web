export const authenticatedSelector = state => state.auth.token !== null
export const loggingInSelector = state => state.auth.loggingIn
export const loginErrorMessageSelector = state => state.auth.loginError
