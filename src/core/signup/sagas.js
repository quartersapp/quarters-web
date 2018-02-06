import { getContext, takeLatest, call, put } from 'redux-saga/effects'
import { actions } from './logic'
import { gql } from 'react-apollo'

export function * signupSaga () {
  const apolloClient = yield getContext('apolloClient')
  yield takeLatest(actions.submitRequest, signup, apolloClient)
}

function * signup (apolloClient, action) {
  yield put(actions.submitStart())
  try {
    yield call(mutate, apolloClient, action.payload)
    yield put(actions.submitSuccess())
  } catch (err) {
    yield put(actions.submitError(err))
  }
}

const mutation = gql`
  mutation createHostUser ($input: CreateHostUserInput!) {
    createHostUser(input: $input) {
      user {
        name,
        email
      }
    }
  }
`

function mutate (apolloClient, payload) {
  return apolloClient.mutate({
    mutation,
    variables: { input: payload }
  })
}
