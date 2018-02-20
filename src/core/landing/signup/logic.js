import { combineReducers } from 'redux'
import { mount, createReducer } from 'redux-modular'
import { propertySelectors } from 'common/helpers'
import { getContext, takeLatest, call, put } from 'redux-saga/effects'
import gql from 'graphql-tag'
import { unexpectedError } from 'common/errors'
import { login, loginSuccess } from 'common/auth'

export const { actions, reducer, selectors } = mount('signup', {
  actions: {
    submitRequest: params => params,
    submitStart: null,
    submitSuccess: null,
    submitError: error => error
  },

  reducer: actions => combineReducers({
    submitting: createReducer(false, {
      [actions.submitStart]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitError]: () => false
    }),
    submitError: createReducer(null, {
      [actions.submitError]: (_, error) => error.message,
      [actions.submitStart]: false
    })
  }),

  selectors: propertySelectors(['submitting', 'submitError'])
})

export function * saga () {
  const apolloClient = yield getContext('apolloClient')
  yield takeLatest(actions.submitRequest, signup, apolloClient)
}

function * signup (apolloClient, action) {
  yield put(actions.submitStart())
  try {
    yield call(mutate, apolloClient, action.payload)
    const { email, password } = action.payload
    const token = yield call(login, email, password)
    yield put(loginSuccess(token))
    yield put(actions.submitSuccess())
  } catch (err) {
    if (err.graphQLErrors && err.graphQLErrors.some(err => err.message === 'A user with that email already exists')) {
      yield put(actions.submitError(new Error('A user with that email already exists')))
    } else {
      yield put(actions.submitError(new Error('An unknown error occurred')))
      yield put(unexpectedError(err))
    }
  }
}

const mutation = gql`
  mutation createHostUser ($input: CreateHostUserInput!) {
    createHostUser(input: $input) {
      user { name, email }
    }
  }
`

async function mutate (apolloClient, payload) {
  return apolloClient.mutate({
    mutation,
    variables: { input: payload }
  })
}