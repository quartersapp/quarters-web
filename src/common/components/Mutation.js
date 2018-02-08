import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Mutation extends Component {
  constructor (props, context) {
    super(props, context)
    if (!context.client) throw new Error('<ApolloProvider /> required for mutation')
    this.client = context.client
  }

  static contextTypes = {
    client: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.func.isRequired,
    mutation: PropTypes.object
  }

  mutate = options => {
    const optionWhitelist = ['mutation', 'variables', 'errorPolicy']

    const params = optionWhitelist.reduce((prev, optionName) => {
      return Object.assign({}, prev, {
        [optionName]: options[optionName] || this.props[optionName]
      })
    }, {})

    return this.client.mutate(params)
  }

  render () {
    return this.props.children({ mutate: this.mutate })
  }
}
