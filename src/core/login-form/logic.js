import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { modularize, createReducer } from 'redux-modular'
import { combineValidators, isRequired } from 'revalidate'

const initialValues = { email: '', password: '' }

const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
})

export default modularize({
  actions: {
    reset: () => null,
    changeValue: (field, value) => ({ field, value })
  },

  reducer: actions => combineReducers({
    values: createReducer(initialValues, {
      [actions.changeValue]: (state, { field, value }) => {
        return Object.assign({}, state, { [field]: value })
      },
      [actions.reset]: () => initialValues
    })
  }),

  selectors: formState => {
    const values = state => formState(state).values
    const valid = createSelector(
      values,
      values => {
        const errors = validate(values)
        return Object.keys(errors).length === 0
      }
    )

    return { values, valid }
  }
})('loginForm')
