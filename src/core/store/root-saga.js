import { all, setContext } from 'redux-saga/effects'

import * as auth from 'common/auth'
import * as signup from 'core/signup'

export default function * rootSaga (apolloClient) {
  yield setContext({ apolloClient })
  yield all([
    auth.manageAuthentication(),
    signup.signupSaga()
  ])
}
