import PropTypes from 'prop-types'
import { kea } from 'kea'

export default kea({
  path: () => ['common', 'auth'],

  actions: () => ({
    loginRequest: (email, password) => ({ email, password }),
    loginSuccess: token => ({ token }),
    loginStart: payload => payload,
    loginError: error => error,
    logout: true
  }),

  reducers: ({ actions }) => ({
    authenticated: [false, PropTypes.bool.isRequired, {
      [actions.loginSuccess]: () => true,
      [actions.loginError]: () => false,
      [actions.logout]: () => false
    }],

    loggingIn: [false, PropTypes.bool.isRequired, {
      [actions.loginStart]: () => true,
      [actions.loginSuccess]: () => false,
      [actions.loginError]: () => false,
      [actions.logout]: () => false
    }],

    loginError: [null, PropTypes.object, {
      [actions.loginError]: (_, payload) => payload.message,
      [actions.loginStart]: () => null,
      [actions.logout]: () => null
    }]
  })
})
