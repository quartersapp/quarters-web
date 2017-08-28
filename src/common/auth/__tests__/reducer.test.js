/* eslint-env jest */

import reducer from '../reducer'
import { loginRequest, loginSuccess, loginError, logout } from '../actions'

it('manages the loggingIn flag while a login is occuring', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(state.loggingIn).toEqual(false)

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(state.loggingIn).toEqual(true)

  state = reducer(state, loginSuccess('api_token'))
  expect(state.loggingIn).toEqual(false)

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(state.loggingIn).toEqual(true)

  state = reducer(state, loginError(new Error('Something went wrong')))
  expect(state.loggingIn).toEqual(false)
})

it('populates loginError with the error message', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(state.loginError).toEqual(null)

  state = reducer(state, loginError(new Error('Invalid credentials')))
  expect(state.loginError).toEqual('Invalid credentials')

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(state.loginError).toEqual(null)
})

it('clears the state on logout', () => {
  let state = reducer(undefined, loginRequest('test@example.com', 'password'))

  state = reducer(state, logout())
  expect(state.loggingIn).toEqual(false)

  state = reducer(state, loginError(new Error('Something went wrong')))
  state = reducer(state, logout())
  expect(state.loginError).toEqual(null)
})
