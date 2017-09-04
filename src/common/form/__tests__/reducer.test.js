/* eslint-env jest */

import {
  registerForm,
  deregisterForm,
  changeFormValue
} from '../actions'
import reducer from '../reducer'

const FORM_NAME = 'testForm'

it('has an initial state', () => {
  expect(
    reducer(undefined, { type: '@@INIT' })
  ).toEqual({})
})

it('returns the current state for an unknown action', () => {
  const state = { some: 'state' }
  expect(reducer(state, { type: 'UNKNOWN' })).toEqual(state)
})

it('can register and deregister forms', () => {
  let state = reducer(undefined, registerForm(FORM_NAME))

  expect(state).toEqual({
    [FORM_NAME]: {
      values: {},
      numRegisteredForms: 1
    }
  })

  state = reducer(state, registerForm(FORM_NAME))
  expect(state).toEqual({
    [FORM_NAME]: {
      values: {},
      numRegisteredForms: 2
    }
  })

  state = reducer(state, deregisterForm(FORM_NAME))

  expect(state).toEqual({
    [FORM_NAME]: {
      values: {},
      numRegisteredForms: 1
    }
  })

  expect(
    reducer(state, deregisterForm(FORM_NAME))
  ).toEqual({})
})

it('can set form values', () => {
  const state = reducer(undefined, registerForm(FORM_NAME))

  expect(
    reducer(state, changeFormValue(FORM_NAME, 'testField', 'testValue'))
  ).toEqual({
    [FORM_NAME]: {
      values: {
        'testField': 'testValue'
      },
      numRegisteredForms: 1
    }
  })
})
