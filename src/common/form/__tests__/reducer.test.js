/* eslint-env jest */

import {
  registerForm,
  deregisterForm,
  moveRegisteredForm,
  changeFormValue
} from '../actions'
import reducer from '../reducer'
import { static as Immutable } from 'seamless-immutable'

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

describe('moveRegisteredForm', () => {
  it('can move registered forms', () => {
    let state = Immutable({
      [FORM_NAME]: {
        values: {},
        numRegisteredForms: 2
      }
    })

    const NEW_FORM_NAME = 'newForm'
    state = reducer(state, moveRegisteredForm(FORM_NAME, NEW_FORM_NAME))

    expect(state).toEqual({
      [FORM_NAME]: {
        values: {},
        numRegisteredForms: 1
      },
      [NEW_FORM_NAME]: {
        values: {},
        numRegisteredForms: 1
      }
    })

    state = reducer(state, moveRegisteredForm(FORM_NAME, NEW_FORM_NAME))

    expect(state).toEqual({
      [NEW_FORM_NAME]: {
        values: {},
        numRegisteredForms: 2
      }
    })
  })

  it('retains values if the new form has not been initialized', () => {
    let state = Immutable({
      [FORM_NAME]: {
        values: { some: 'values' },
        numRegisteredForms: 1
      }
    })

    const NEW_FORM_NAME = 'newForm'
    state = reducer(state, moveRegisteredForm(FORM_NAME, NEW_FORM_NAME))

    expect(state).toEqual({
      [NEW_FORM_NAME]: {
        values: { some: 'values' },
        numRegisteredForms: 1
      }
    })
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
      numRegisteredForms: 1
    }
  })
})
