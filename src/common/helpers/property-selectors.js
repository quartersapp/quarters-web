/**
 * Shorthand for exposing local property selectors.
 * For use with redux-modular formatted selectors.
 */

export default function propertySelectors (properties) {
  return localStateSelector => {
    return properties.reduce((prev, property) => {
      return Object.assign({}, prev, {
        [`${property}Selector`]: state => localStateSelector(state)[property]
      })
    }, {})
  }
}
