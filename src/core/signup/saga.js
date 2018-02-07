import { getContext, takeLatest, call, put } from 'redux-saga/effects'
import gql from 'graphql-tag'
import { actions } from './logic'
import { unexpectedError, GraphqlError } from 'common/errors'

export default function * signupSaga () {
  const apolloClient = yield getContext('apolloClient')
  yield takeLatest(actions.submitRequest, signup, apolloClient)
}

function * signup (apolloClient, action) {
  yield put(actions.submitStart())
  try {
    yield call(mutate, apolloClient, action.payload)
    yield call()
    yield put(actions.submitSuccess())
  } catch (err) {
    if (err instanceof GraphqlError && err.errors.some(err => err.message === 'A user with that email already exists')) {
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
      user {
        name,
        email
      }
    }
  }
`

async function mutate (apolloClient, payload) {
  const result = await apolloClient.mutate({
    mutation,
    variables: { input: payload },
    errorPolicy: 'all'
  })

  if (result.errors) {
    throw new GraphqlError(result.errors)
  }

  return result
}
