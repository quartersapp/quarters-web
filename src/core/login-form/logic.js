import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { mount, createReducer } from 'redux-modular'
import { combineValidators, isRequired } from 'revalidate'

const initialValues = { email: '', password: '' }

const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
})

const loginFormLogic = {
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
}

export default mount('loginForm', loginFormLogic)
