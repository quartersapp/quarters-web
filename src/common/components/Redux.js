import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Redux extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    actions: PropTypes.objectOf(PropTypes.func),
    selector: PropTypes.func
  }

  static defaultProps = {
    actions: {}
  }

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  }

  constructor (props, context) {
    super(props, context)

    if (this.props.selector) {
      this.state = { selectedState: this.selectState() }
    }
  }

  componentDidMount () {
    this.unsubscribe = this.context.store.subscribe(() => {
      if (this.unsubscribed) return // bit of a hack
      const selectedState = this.selectState()
      if (selectedState !== this.state) {
        this.setState({ selectedState })
        this.forceUpdate()
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribed = true // bit of a hack
    return this.unsubscribe()
  }

  // TODO: add lifecycle to react to selector changes

  selectState = () => {
    return this.props.selector(this.context.store.getState())
  }

  render () {
    return this.props.children({
      // TODO: only calculate this when actions prop changes
      actions: Object.keys(this.props.actions).reduce((prev, actionName) => {
        return Object.assign(prev, {
          [actionName]: (...args) => this.context.store.dispatch(this.props.actions[actionName](...args))
        })
      }, {}),
      state: this.state.selectedState
    })
  }
}
