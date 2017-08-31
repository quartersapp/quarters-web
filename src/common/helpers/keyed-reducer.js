import Immutable from 'seamless-immutable'

const initialState = Immutable.static.from({})

export default (keyProp, INITIALIZE_ACTION, DESTROY_ACTION, RENAME_ACTION) => {
  return itemReducer => (state = initialState, action) => {
    if (!action.payload) return state /* Only support FSA */
    const { payload } = action

    const key = payload[keyProp]
    const itemState = state[key]

    switch (action.type) {
      case INITIALIZE_ACTION:
        return Immutable.static.set(state, key, itemReducer(itemState, action))
      case DESTROY_ACTION:
        return Immutable.static.without(state, key)
      case RENAME_ACTION:
        return Immutable.without(Immutable.static.set(state, payload.to, state[payload.from]), payload.from)
    }

    /**
     * Pass all other actions to item reducer
     */

    if (itemState) {
      return Immutable.static.set(state, key, itemReducer(itemState, action))
    }

    return state
  }
}
