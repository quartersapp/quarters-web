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
          testForm: {
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
})
