import Immutable from 'seamless-immutable'

export const formValueSelector = (form, field) => state => {
  return Immutable.static(state.auth).getIn([form, 'values', field], undefined)
}
