module.exports = (options = {}) => {
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
