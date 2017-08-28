import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default form => {
  return class Form extends Component {
    propTypes = {
      form: PropTypes.string.isRequired,
      handleSubmit: PropTypes.handleSubmit.isRequired,
      children: PropTypes.node.isRequired
    }

    getChildContext () { return { form } }

    handleSubmit = e => {
      e.preventDefault()
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.props.children}
        </form>
      )
    }
  }
}
