const { mount } = require('redux-modular')
const { takeEvery } = require('redux-saga/effects')

export const { actions: { unexpectedError } } = mount('errors', {
  actions: {
    unexpectedError: err => err
  }
})

export function * saga () {
  yield takeEvery(unexpectedError, action => {
    const err = action.payload
    console.error(err, err.errors)
  })
}
