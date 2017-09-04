import { createReducer } from 'redux-create-reducer'
import { combineReducers } from 'redux'
import { static as Immutable } from 'seamless-immutable'
import {
  CHANGE_FORM_VALUE,
  REGISTER_FORM,
  DEREGISTER_FORM
} from './types'

const formReducer = combineReducers({
  initialValues: createReducer({}, {}),
  values: createReducer({}, {
    [CHANGE_FORM_VALUE] (state, { payload: { field, value } }) {
      return Immutable.set(state, field, value)
    }
  }),
  numRegisteredForms: createReducer(0, {
    [REGISTER_FORM]: state => state + 1,
    [DEREGISTER_FORM]: state => state - 1
  })
})

const initialState = Immutable({})

const formsReducer = (optionsPerForm = {}) => {
  return (state = initialState, action) => {
    const { type, payload } = action

    if (type === REGISTER_FORM) {
      const { form } = payload

      if (!state[form] && optionsPerForm[form] && optionsPerForm[form].initialValues) {
        state = Immutable.setIn(state, [form, 'initialValues'], optionsPerForm[form].initialValues)
      }

      return Immutable.set(state, form, formReducer(state[form], action))
    } else if (type === DEREGISTER_FORM) {
      const { form } = payload
      const nextFormState = formReducer(state[form], action)
      if (nextFormState.numRegisteredForms > 0) {
        return Immutable.set(state, form, nextFormState)
      } else {
        return Immutable.without(state, form)
      }
    } else if (type === CHANGE_FORM_VALUE && state[payload.form]) {
      return Immutable.set(state, payload.form, formReducer(state[payload.form], action))
    } else { // proxy all remaining actions to each formReducer
      return state
    }
  }
}

export default formsReducer
