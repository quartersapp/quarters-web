/* eslint-env jest */

import { mount } from 'redux-modular'
import { logic } from '../logic'

const {
  reducer,
  actions: { loginStart, loginSuccess, loginError, logout },
  selectors: {
    authenticatedSelector,
    loggingInSelector,
    loginErrorSelector
  }
} = mount(null, logic)

it('sets authenticated when logging in and out', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(authenticatedSelector(state)).toEqual(false)

  state = reducer(state, loginSuccess('some_token'))
  expect(authenticatedSelector(state)).toEqual(true)

  state = reducer(state, logout())
  expect(authenticatedSelector(state)).toEqual(false)
})

it('sets loggingIn while a login is occuring', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loggingInSelector(state)).toEqual(false)

  state = reducer(state, loginStart())
  expect(loggingInSelector(state)).toEqual(true)

  state = reducer(state, loginSuccess('api_token'))
  expect(loggingInSelector(state)).toEqual(false)

  state = reducer(state, loginStart())
  expect(loggingInSelector(state)).toEqual(true)

  state = reducer(state, loginError(new Error('Something went wrong')))
  expect(loggingInSelector(state)).toEqual(false)
})

it('sets loginError with the error message', () => {
  let state = reducer(undefined, { type: '@@INIT' })
  expect(loginErrorSelector(state)).toEqual(null)

  state = reducer(state, loginError(new Error('Invalid credentials')))
  expect(loginErrorSelector(state)).toEqual('Invalid credentials')

  state = reducer(state, loginStart())
  expect(loginErrorSelector(state)).toEqual(null)
})

it('manages logout state when login is cancelled', () => {
  let state = reducer(undefined, loginStart())

  state = reducer(state, logout())
  expect(loggingInSelector(state)).toEqual(false)

  state = reducer(state, loginError(new Error('Something went wrong')))
  state = reducer(state, logout())
  expect(loginErrorSelector(state)).toEqual(null)
})
