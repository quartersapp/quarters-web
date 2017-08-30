export default options => {
  if (typeof options !== 'object') {
    throw new Error('booleanReducer requires an object of options to be passed')
  }

  const {
    initialState = false,
    true: trueActions = [],
    false: falseActions = []
  } = options

  return (state = initialState, action) => {
    if (trueActions.includes(action.type)) {
      return true
    } else if (falseActions.includes(action.type)) {
      return false
    } else {
      return state
    }
  }
}
