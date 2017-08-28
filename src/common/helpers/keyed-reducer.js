import Immutable from 'seamless-immutable'

const initialState = Immutable.from({})

export default (key, INITIALIZE_ACTION, DESTROY_ACTION) => itemReducer => (state = initialState, action) => {
  if (!action[key]) return state

  if (action.type === DESTROY_ACTION) {
    return Immutable.static.without(key)
  } else if (action.type === INITIALIZE_ACTION) {
    return Immutable.static.set(state, key, itemReducer(undefined, action))
  } else if (state[key]) { // only call reducer if it has been initialized
    return Immutable.static.set(state, key, itemReducer(state[key], key))
  } else {
    return state
  }
}
