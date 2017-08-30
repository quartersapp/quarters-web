/* eslint-env jest */

import {
  initializeForm,
  destroyForm,
  changeFormValue
} from '../actions'
import reducer from '../reducer'

const TEST_FORM_NAME = 'testForm'

it('has an initial state', () => {
  expect(
    reducer(undefined, { type: '@@INIT' })
  ).toEqual({})
})

it('can initialize and destroy a form', () => {
  let state = reducer(undefined, initializeForm(TEST_FORM_NAME))

  expect(state).toEqual({
    [TEST_FORM_NAME]: {
      values: {}
    }
  })

  expect(
    reducer(state, destroyForm(TEST_FORM_NAME))
  ).toEqual({})
})

it('can set form values', () => {
  const state = reducer(undefined, initializeForm(TEST_FORM_NAME))

  expect(
    reducer(state, changeFormValue(TEST_FORM_NAME, 'testField', 'testValue'))
  ).toEqual({
    [TEST_FORM_NAME]: {
      values: {
        'testField': 'testValue'
      }
    }
  })
})
