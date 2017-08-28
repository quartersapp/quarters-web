/* eslint-env jest */
/* global localStorage */

import nock from 'nock'
import { API_URL } from 'config'
import sagaHelper from 'redux-saga-testing'
import { loginRequest, loginStart, loginSuccess, loginError, logout } from '../actions'
import { authenticatedSelector } from '../selectors'
import { LOGOUT, LOGIN_REQUEST, LOGIN_ERROR } from '../types'
import { manageAuthentication, authorize, login } from '../sagas'
import { call, put, select, take, fork, cancel } from 'redux-saga/effects'
import { createMockTask } from 'redux-saga/utils'

beforeEach(() => localStorage.clear())
afterEach(() => nock.cleanAll())

const email = 'test@example.com'
const password = 'password'

describe('manageAuthentication', () => {
  describe('logging in after a failed login attempt', () => {
    const it = sagaHelper(manageAuthentication())

    it('checks if the user is currently authenticated', result => {
      expect(result).toEqual(select(authenticatedSelector))
      return false
    })

    it('takes a login request', result => {
      expect(result).toEqual(take(LOGIN_REQUEST))
      return loginRequest(email, password)
    })

    it('forks an authorize task', result => {
      expect(result).toEqual(fork(authorize, email, password))
      return createMockTask()
    })

    it('takes a LOGIN_ERROR', result => {
      expect(result).toEqual(take([LOGOUT, LOGIN_ERROR]))
      return loginError(new Error('Invalid credentials'))
    })

    it('takes a LOGIN_REQUEST', result => {
      expect(result).toEqual(take(LOGIN_REQUEST))
    })
  })

  describe('cancelling a pending login', () => {
    const it = sagaHelper(manageAuthentication())

    it('checks if the user is currently authenticated', result => {
      expect(result).toEqual(select(authenticatedSelector))
      return false
    })

    it('takes a login request', result => {
      expect(result).toEqual(take(LOGIN_REQUEST))
      return loginRequest(email, password)
    })

    let loginTask

    it('forks an authorize task', result => {
      expect(result).toEqual(fork(authorize, email, password))
      loginTask = createMockTask()
      return loginTask
    })

    it('takes a LOGOUT', result => {
      expect(result).toEqual(take([LOGOUT, LOGIN_ERROR]))
      return logout()
    })

    it('cancels the login task', result => {
      expect(result).toEqual(cancel(loginTask))
    })

    it('takes a new login request', result => {
      expect(result).toEqual(take(LOGIN_REQUEST))
    })
  })

  describe('logging out then back in', () => {
    const it = sagaHelper(manageAuthentication())

    beforeEach(() => {
      localStorage.setItem('authToken', 'some_token')
    })

    it('checks if the user is currently authenticated', result => {
      expect(result).toEqual(select(authenticatedSelector))
      return true
    })

    it('takes a LOGOUT action', result => {
      expect(result).toEqual(take([LOGOUT, LOGIN_ERROR]))
      return logout()
    })

    it('clears the auth token from localStorage take a new login request', result => {
      expect(localStorage.getItem('authToken')).toEqual(null)
      expect(result).toEqual(take(LOGIN_REQUEST))
    })
  })
})

describe('authorize', () => {
  describe('successful login', () => {
    const it = sagaHelper(authorize(email, password))

    it('dispatches a loginStart', result => {
      expect(result).toEqual(put(loginStart()))
    })

    const token = 'some_token'

    it('calls login', result => {
      expect(result).toEqual(call(login, email, password))
      return token
    })

    it('stores the token in localStorage and dispatches a loginSuccess', (result) => {
      expect(localStorage.getItem('authToken')).toEqual(token)
      expect(result).toEqual(put(loginSuccess(token)))
    })

    it('finishes', result => expect(result).toBeUndefined())
  })

  describe('login error', () => {
    const it = sagaHelper(authorize(email, password))

    it('dispatches a loginStart', result => {
      expect(result).toEqual(put(loginStart()))
    })

    const error = new Error('Invalid credentials')

    it('calls login', result => {
      expect(result).toEqual(call(login, email, password))
      return error
    })

    it('dispatches a loginError', result => {
      expect(result).toEqual(put(loginError(error)))
    })

    it('finishes', result => expect(result).toBeUndefined())
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
