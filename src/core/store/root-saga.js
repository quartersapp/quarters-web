import { all } from 'redux-saga/effects'

import { authenticationManager } from 'common/auth'

export default function * rootSaga () {
  yield all([authenticationManager()])
}
