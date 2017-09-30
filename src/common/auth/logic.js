import { combineReducers } from 'redux'
import { modularize, createReducer } from 'redux-modular'

const PATH = 'auth'

export default modularize({
  actions: {
    loginRequest: (email, password) => ({ email, password }),
    loginSuccess: token => ({ token }),
    loginStart: payload => payload,
    loginError: error => error,
    logout: () => null
  },

  reducer: actions => combineReducers({
    authenticated: createReducer(false, {
      [actions.loginSuccess]: () => true,
      [actions.loginError]: () => false,
      [actions.logout]: () => false
    }),

    loggingIn: createReducer(false, {
      [actions.loginStart]: () => true,
      [actions.loginSuccess]: () => false,
      [actions.loginError]: () => false,
      [actions.logout]: () => false
    }),

    loginError: createReducer(null, {
      [actions.loginError]: (_, payload) => payload.message,
      [actions.loginStart]: () => null,
      [actions.logout]: () => null
    })
  }),

  selectors: authSelector => ({
    authenticated: state => authSelector(state).authenticated,
    loggingIn: state => authSelector(state).loggingIn,
    loginError: state => authSelector(state).loginError
  })
})(PATH)
