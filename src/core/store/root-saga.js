import { all } from 'redux-saga/effects'

import { manageAuthentication } from 'common/auth'

export default function * rootSaga () {
  yield all([manageAuthentication()])
}
