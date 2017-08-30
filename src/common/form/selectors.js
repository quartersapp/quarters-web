import Immutable from 'seamless-immutable'

export const createFormValuesSelector = form => state => {
  return Immutable.static.getIn(state.form, [form, 'values'], {})
}
