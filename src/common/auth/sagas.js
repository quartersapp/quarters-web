/* global fetch localStorage */

import 'isomorphic-fetch'
import { take, call, fork, put, cancel, select } from 'redux-saga/effects'
import { API_URL } from 'config'

import { loginStart, loginError, loginSuccess } from './actions'
import { authenticatedSelector } from './selectors'
import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT
} from './types'

export function * manageAuthentication () {
  let authenticated = yield select(authenticatedSelector)

  while (true) {
    let loginTask

    if (!authenticated) {
      const { payload: { email, password } } = yield take(LOGIN_REQUEST)
      loginTask = yield fork(authorize, email, password)
    }

    const action = yield take([LOGOUT, LOGIN_ERROR])
    if (action.type === LOGOUT) {
      authenticated = false
      if (loginTask && loginTask.isRunning()) {
        yield cancel(loginTask)
      }
      localStorage.removeItem('authToken')
    }
  }
}

export function * authorize (email, password) {
  yield put(loginStart())

  try {
    const token = yield call(login, email, password)

    localStorage.setItem('authToken', token)
    yield put(loginSuccess(token))
    return token
  } catch (err) {
    yield put(loginError(err))
  }
}

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (response.status === 401) {
    throw new Error('Invalid credentials')
  } else if (!response.ok) {
    throw new Error('Something unexpected went wrong')
  }

  const { token } = await response.json()
  return token
}
