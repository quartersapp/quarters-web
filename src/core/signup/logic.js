import { combineReducers } from 'redux'
import { mount, createReducer } from 'redux-modular'
import { propertySelectors } from 'common/helpers'

export const { actions, reducer, selectors } = mount('signup', {
  actions: {
    submitRequest: params => params,
    submitStart: null,
    submitSuccess: null,
    submitError: error => error
  },

  reducer: actions => combineReducers({
    submitting: createReducer(false, {
      [actions.submitStart]: () => true,
      [actions.submitSuccess]: () => false,
      [actions.submitError]: () => false
    }),
    submitError: createReducer(null, {
      [actions.submitError]: (_, error) => error.message,
      [actions.submitStart]: false
    })
  }),

  selectors: propertySelectors(['submitting', 'submitError'])
})
