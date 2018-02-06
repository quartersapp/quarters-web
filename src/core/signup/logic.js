import { combineReducers } from 'redux'
import { mount, createReducer } from 'redux-modular'

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
      [actions.submitError]: (_, err) => err.message,
      [actions.submitStart]: false
    })
  }),

  selectors: localStateSelector => ({
    submitting: state => localStateSelector(state).submitting,
    submitError: state => localStateSelector(state).submitError
  })
})
