import { getContext, takeLatest, call, put } from 'redux-saga/effects'
import { actions } from './logic'
import gql from 'graphql-tag'

class ExistingEmailError extends Error {
  constructor () {
    super('A user with that email already exists')
  }
}

class UnknownError extends Error {
  constructor (graphqlErrors) {
    super('An unknown error occurred')
    this.graphqlErrors = graphqlErrors
  }
}

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

async function mutate (apolloClient, payload) {
  const result = await apolloClient.mutate({
    mutation,
    variables: { input: payload },
    errorPolicy: 'all'
  })

  if (result.errors) {
    if (result.errors.some(err => err.message === 'A user with that email already exists')) {
      throw new ExistingEmailError()
    } else {
      throw new UnknownError(result.errors)
    }
  }

  return result
}
