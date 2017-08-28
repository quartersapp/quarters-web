/* eslint-env jest */
/* global localStorage */

import nock from 'nock'
import { API_URL } from 'config'
import { loginRequest, loginSuccess, loginError, logout } from '../actions'
import { authenticatedSelector } from '../selectors'
import { LOGOUT, LOGIN_REQUEST, LOGIN_ERROR } from '../types'
import { authenticationManager, authorize, login } from '../sagas'
import { call, put, select, take, fork, cancel } from 'redux-saga/effects'
import { createMockTask } from 'redux-saga/utils'

beforeEach(() => localStorage.clear())
afterEach(() => nock.cleanAll())

describe('authenticationManager', () => {
  it('allows the user to login after a failed login attempt', () => {
    const gen = authenticationManager()
    expect(gen.next().value).toEqual(select(authenticatedSelector))
    expect(gen.next(false).value).toEqual(take(LOGIN_REQUEST))

    const email = 'test@example.com'
    const password = 'password'

    expect(gen.next(loginRequest(email, password)).value).toEqual(fork(authorize, email, password))
    expect(gen.next(createMockTask()).value).toEqual(take([LOGOUT, LOGIN_ERROR]))
    expect(gen.next(loginError(new Error('Something happened'))).value).toEqual(take(LOGIN_REQUEST))
  })

  it('allows the user to cancel a pending login', () => {
    const gen = authenticationManager()
    expect(gen.next().value).toEqual(select(authenticatedSelector))
    expect(gen.next(false).value).toEqual(take(LOGIN_REQUEST))

    const email = 'test@example.com'
    const password = 'password'

    expect(gen.next(loginRequest(email, password)).value).toEqual(fork(authorize, email, password))

    const loginTask = createMockTask()
    expect(gen.next(loginTask).value).toEqual(take([LOGOUT, LOGIN_ERROR]))
    expect(gen.next(logout()).value).toEqual(cancel(loginTask))
    expect(gen.next().value).toEqual(take(LOGIN_REQUEST))
  })

  it('allows the user to log out then log back in', () => {
    localStorage.setItem('authToken', 'some_token')

    const gen = authenticationManager()
    expect(gen.next().value).toEqual(select(authenticatedSelector))
    expect(gen.next(true).value).toEqual(take([LOGOUT, LOGIN_ERROR]))
    expect(gen.next(logout()).value).toEqual(take(LOGIN_REQUEST))

    expect(localStorage.getItem('authToken')).toEqual(null)
  })
})

describe('authorize', () => {
  it('logs the user in, stores the auth token in localStorage and dispatches loginSuccess', () => {
    const email = 'test@example.com'
    const password = 'password'

    const gen = authorize('test@example.com', password)
    expect(gen.next().value).toEqual(call(login, email, password))

    const token = 'some_token'
    expect(gen.next(token).value).toEqual(put(loginSuccess(token)))

    expect(localStorage.getItem('authToken')).toEqual(token)

    expect(gen.next()).toEqual({ value: token, done: true })
  })

  it('handles a login error', () => {
    const email = 'test@example.com'
    const password = 'password'

    const gen = authorize('test@example.com', password)
    expect(gen.next().value).toEqual(call(login, email, password))

    const error = new Error('Invalid credentials')

    expect(gen.throw(error).value).toEqual(put(loginError(error)))
  })
})

describe('login', () => {
  it('logs the user in via the authentication API', async () => {
    const email = 'test@example.com'
    const password = 'password'

    const scope = nock(API_URL)
      .post('/auth/login')
      .reply(200, {
        token: 'some_auth_token'
      })

    const token = await login(email, password)
    expect(token).toEqual('some_auth_token')
    expect(scope.isDone()).toEqual(true)
  })

  it('distinguishes a 401 error as invalid credentials', async () => {
    const email = 'test@example.com'
    const password = 'password'

    nock(API_URL)
      .post('/auth/login')
      .reply(401)

    expect(login(email, password)).rejects.toEqual(new Error('Invalid credentials'))

    nock(API_URL)
      .post('/auth/login')
      .reply(500)

    expect(login(email, password)).rejects.toEqual(new Error('Something unexpected went wrong'))
  })
})
