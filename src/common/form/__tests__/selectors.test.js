/* eslint-env jest */

import Immutable from 'seamless-immutable'
import { createFormValuesSelector } from '../selectors'

const FORM_NAME = 'testForm'

describe('createFormValuesSelector', () => {
  const formValuesSelector = createFormValuesSelector(FORM_NAME)

  it('returns an empty object for an uninitialized form', () => {
    expect(
      formValuesSelector({
        form: Immutable.static({})
      })
    ).toEqual({})
  })

  it('returns the form values for a given form', () => {
    expect(
      formValuesSelector({
        form: Immutable.static({
          [FORM_NAME]: {
            values: {
              email: 'test@example.com',
              password: 'password'
            }
          }
        })
      })
    ).toEqual({
      email: 'test@example.com',
      password: 'password'
    })
  })

  it('merges with initialValues when form values are missing', () => {
    expect(
      formValuesSelector({
        form: Immutable.static({
          [FORM_NAME]: {
            initialValues: {
              password: ''
            },
            values: {
              email: 'test@example.com'
            }
          }
        })
      })
    ).toEqual({
      email: 'test@example.com',
      password: ''
    })
  })
})
