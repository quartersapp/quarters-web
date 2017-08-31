/* eslint-env jest */

import {
  initializeForm,
  destroyForm,
  renameForm,
  changeFormValue
} from '../actions'
import reducer from '../reducer'

const FORM_NAME = 'testForm'

it('has an initial state', () => {
  expect(
    reducer(undefined, { type: '@@INIT' })
  ).toEqual({})
})

it('can initialize, rename and destroy a form', () => {
  let state = reducer(undefined, initializeForm(FORM_NAME))

  expect(state).toEqual({
    [FORM_NAME]: {
      values: {}
    }
  })

  const NEW_FORM_NAME = 'newForm'
  state = reducer(state, renameForm(FORM_NAME, NEW_FORM_NAME))

  expect(state).toEqual({
    [NEW_FORM_NAME]: {
      values: {}
    }
  })

  expect(
    reducer(state, destroyForm(NEW_FORM_NAME))
  ).toEqual({})
})

it('can set form values', () => {
  const state = reducer(undefined, initializeForm(FORM_NAME))

  expect(
    reducer(state, changeFormValue(FORM_NAME, 'testField', 'testValue'))
  ).toEqual({
    [FORM_NAME]: {
      values: {
        'testField': 'testValue'
      }
    }
  })
})
