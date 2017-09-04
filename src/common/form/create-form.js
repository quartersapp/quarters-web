import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { registerForm, deregisterForm } from './actions'
import { createFormValuesSelector } from './selectors'

export const createForm = name => {
  class Form extends Component {
    componentWillMount () {
      this.props.registerForm(name)
    }

    componentWillUnmount () {
      this.props.deregisterForm(name)
    }

    /**
     * Set the form name to the context so that field
     * components have access to the form name
     */
    getChildContext () {
      return { form: name }
    }

    handleSubmit = e => {
      e.preventDefault()
      this.props.onSubmit && this.props.onSubmit(this.props.values)
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.props.children}
        </form>
      )
    }
  }

  Form.childContextTypes = {
    form: PropTypes.string
  }

  Form.propTypes = {
    onSubmit: PropTypes.func,
    children: PropTypes.node
  }

  return Form
}

export default name => connect(
  createStructuredSelector({ values: createFormValuesSelector(name) }),
  { registerForm, deregisterForm }
)(createForm(name))
