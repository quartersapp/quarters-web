/* eslint-env jest */

import booleanReducer from '../boolean-reducer'

it('can allows initial state to be set, defaulting to false', () => {
  let reducer

  reducer = booleanReducer({ initialState: false })
  expect(reducer(undefined, { type: '@@INIT' })).toEqual(false)

  reducer = booleanReducer({ initialState: true })
  expect(reducer(undefined, { type: '@@INIT' })).toEqual(true)

  reducer = booleanReducer() // default
  expect(reducer(undefined, { type: '@@INIT' })).toEqual(false)
})

it('sets state to boolean values given action types', () => {
  const reducer = booleanReducer({
    true: ['TRUE_1', 'TRUE_2'],
    false: ['TRUE_3', 'TRUE_4']
  })

  expect(reducer(false, { type: 'TRUE_1' })).toEqual(true)
  expect(reducer(true, { type: 'TRUE_4' })).toEqual(false)
})
