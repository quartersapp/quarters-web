/* eslint-env jest */

import {
  registerForm,
  deregisterForm,
  changeFormValue
} from '../actions'
import createFormReducer from '../reducer'

const FORM_NAME = 'testForm'

const reducer = createFormReducer()

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
      initialValues: {},
      numRegisteredForms: 1
    }
  })

  state = reducer(state, registerForm(FORM_NAME))
  expect(state).toEqual({
    [FORM_NAME]: {
      values: {},
      initialValues: {},
      numRegisteredForms: 2
    }
  })

  state = reducer(state, deregisterForm(FORM_NAME))

  expect(state).toEqual({
    [FORM_NAME]: {
      values: {},
      initialValues: {},
      numRegisteredForms: 1
    }
  })

  expect(
    reducer(state, deregisterForm(FORM_NAME))
  ).toEqual({})
})

it('can populate initialValues using options', () => {
  const reducerWithDefaultValue = createFormReducer({
    [FORM_NAME]: {
      initialValues: {
        some: 'values'
      }
    }
  })

  expect(
    reducerWithDefaultValue(undefined, registerForm(FORM_NAME))
  ).toEqual({
    [FORM_NAME]: {
      values: {},
      initialValues: {
        some: 'values'
      },
      numRegisteredForms: 1
    }
  })
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
      initialValues: {},
      numRegisteredForms: 1
    }
  })
})
