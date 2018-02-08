import { all, setContext } from 'redux-saga/effects'

import { saga as auth } from 'common/auth'
import { saga as errors } from 'common/errors'

export default function * rootSaga (apolloClient) {
  yield setContext({ apolloClient })
  yield all([
    auth(),
    errors()
  ])
}
