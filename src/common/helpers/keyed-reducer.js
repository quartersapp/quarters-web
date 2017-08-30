import Immutable from 'seamless-immutable'

const initialState = Immutable.static.from({})

export default (keyProp, INITIALIZE_ACTION, DESTROY_ACTION) => itemReducer => (state = initialState, action) => {
  if (!action.payload || !action.payload[keyProp]) return state

  const key = action.payload[keyProp]

  if (action.type === DESTROY_ACTION) {
    return Immutable.static.without(state, key)
  } else if (action.type === INITIALIZE_ACTION) {
    return Immutable.static.set(state, key, itemReducer(undefined, action))
  } else if (state[key]) { // only call reducer if it has been initialized
    return Immutable.static.set(state, key, itemReducer(state[key], action))
  } else {
    return state
  }
}
