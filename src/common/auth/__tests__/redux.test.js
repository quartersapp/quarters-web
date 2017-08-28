/* eslint-env jest */

import reducer from '../reducer'
import { loginRequest, loginSuccess, loginError, logout } from '../actions'
import {
  authenticatedSelector,
  loggingInSelector,
  loginErrorMessageSelector
} from '../selectors'

it('manages the authenticated flag when logging in and out', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(authenticatedSelector({ auth: state })).toEqual(false)

  state = reducer(state, loginSuccess('some_token'))
  expect(authenticatedSelector({ auth: state })).toEqual(true)

  state = reducer(state, logout())
  expect(authenticatedSelector({ auth: state })).toEqual(false)
})

it('manages the loggingIn flag while a login is occuring', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loggingInSelector({ auth: state })).toEqual(false)

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(loggingInSelector({ auth: state })).toEqual(true)

  state = reducer(state, loginSuccess('api_token'))
  expect(loggingInSelector({ auth: state })).toEqual(false)

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(loggingInSelector({ auth: state })).toEqual(true)

  state = reducer(state, loginError(new Error('Something went wrong')))
  expect(loggingInSelector({ auth: state })).toEqual(false)
})

it('populates loginError with the error message', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loginErrorMessageSelector({ auth: state })).toEqual(null)

  state = reducer(state, loginError(new Error('Invalid credentials')))
  expect(loginErrorMessageSelector({ auth: state })).toEqual('Invalid credentials')

  state = reducer(state, loginRequest('test@example.com', 'password'))
  expect(loginErrorMessageSelector({ auth: state })).toEqual(null)
})

it('clears the state on logout', () => {
  let state = reducer(undefined, loginRequest('test@example.com', 'password'))

  state = reducer(state, logout())
  expect(loggingInSelector({ auth: state })).toEqual(false)

  state = reducer(state, loginError(new Error('Something went wrong')))
  state = reducer(state, logout())
  expect(loginErrorMessageSelector({ auth: state })).toEqual(null)
})
