/* eslint-env jest */

import { set } from 'lodash'
import logic from '../logic'

const {
  reducer,
  actions: { loginStart, loginSuccess, loginError, logout },
  selectors: {
    authenticated,
    loggingIn,
    loginError: loginErrorMessage
  }
} = logic

const buildState = state => set({}, 'auth', state)

it('sets authenticated when logging in and out', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(authenticated(buildState(state))).toEqual(false)

  state = reducer(state, loginSuccess('some_token'))
  expect(authenticated(buildState(state))).toEqual(true)

  state = reducer(state, logout())
  expect(authenticated(buildState(state))).toEqual(false)
})

it('sets loggingIn while a login is occuring', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loggingIn(buildState(state))).toEqual(false)

  state = reducer(state, loginStart())
  expect(loggingIn(buildState(state))).toEqual(true)

  state = reducer(state, loginSuccess('api_token'))
  expect(loggingIn(buildState(state))).toEqual(false)

  state = reducer(state, loginStart())
  expect(loggingIn(buildState(state))).toEqual(true)

  state = reducer(state, loginError(new Error('Something went wrong')))
  expect(loggingIn(buildState(state))).toEqual(false)
})

it('sets loginError with the error message', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loginErrorMessage(buildState(state))).toEqual(null)

  state = reducer(state, loginError(new Error('Invalid credentials')))
  expect(loginErrorMessage(buildState(state))).toEqual('Invalid credentials')

  state = reducer(state, loginStart())
  expect(loginErrorMessage(buildState(state))).toEqual(null)
})

it('manages logout state when login is cancelled', () => {
  let state = reducer(undefined, loginStart())

  state = reducer(state, logout())
  expect(loggingIn(buildState(state))).toEqual(false)

  state = reducer(state, loginError(new Error('Something went wrong')))
  state = reducer(state, logout())
  expect(loginErrorMessage(buildState(state))).toEqual(null)
})
