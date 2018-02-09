/* global fetch localStorage */

import 'isomorphic-fetch'
import { all, take, call, fork, put, cancel, select, takeEvery, getContext } from 'redux-saga/effects'
import { API_URL } from 'config'

import { actions, selectors } from './logic'

const {
  loginRequest, loginStart, logout, loginError, loginSuccess
} = actions
const { authenticatedSelector } = selectors

export default function * authSaga () {
  yield all([
    manageAuthentication(),
    all([
      takeEvery(loginSuccess, persistToken),
      takeEvery(logout, deleteToken),
      takeEvery(logout, resetApolloStore)
    ])
  ])
}

export function * manageAuthentication () {
  let authenticated = yield select(authenticatedSelector)

  while (true) {
    let loginTask

    if (!authenticated) {
      const { payload: { email, password } } = yield take(loginRequest)
      loginTask = yield fork(authorize, email, password)
    }

    const action = yield take([logout, loginError])
    if (action.type === logout.toString()) {
      authenticated = false
      if (loginTask && loginTask.isRunning()) {
        yield cancel(loginTask)
      }
    }
  }
}

export function * authorize (email, password) {
  yield put(loginStart())

  try {
    const token = yield call(login, email, password)
    yield put(loginSuccess(token))
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

export function persistToken (action) {
  localStorage.setItem('authToken', action.payload.token)
}

export function deleteToken (action) {
  localStorage.removeItem('authToken')
}

export function * resetApolloStore () {
  const client = yield getContext('apolloClient')
  yield call(client.resetStore)
}
