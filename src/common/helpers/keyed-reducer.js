import Immutable from 'seamless-immutable'

const initialState = Immutable.static.from({})

export default (keyProp, INITIALIZE_ACTION, DESTROY_ACTION, RENAME_ACTION) => {
  return itemReducer => (state = initialState, action) => {
    if (!action.payload) return state // only support fsa
    const { payload } = action

    const key = payload[keyProp]

    switch (action.type) {
      case INITIALIZE_ACTION:
        return Immutable.static.set(state, key, itemReducer(undefined, action))
      case DESTROY_ACTION:
        return Immutable.static.without(state, key)
      case RENAME_ACTION:
        return Immutable.without(Immutable.static.set(state, payload.to, state[payload.from]), payload.from)
    }

    if (state[key]) {
      return Immutable.static.set(state, key, itemReducer(state[key], action))
    } else {
      return state
    }
  }
}
