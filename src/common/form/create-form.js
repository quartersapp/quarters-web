import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { initializeForm, destroyForm } from './actions'
import { createFormValuesSelector } from './selectors'

export const createForm = (options) => {
  const { name: formName } = options

  class Form extends Component {
    componentWillMount () {
      this.props.initializeForm(formName)
    }

    componentWillUnmount () {
      this.props.destroyForm(formName)
    }

    /**
     * Set the form name to the context so that field
     * components have access to the form name
     */
    getChildContext () {
      return { form: formName }
    }

    handleSubmit = e => {
      e.preventDefault()
      this.props.onSubmit(this.props.values)
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

  return Form
}

export default (options = {}) => {
  const { name: formName } = options

  if (!formName) throw new Error('"name" option is required by createForm')

  const Form = createForm(options)

  Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  return connect(
    createStructuredSelector({
      values: createFormValuesSelector(formName)
    }),
    { initializeForm, destroyForm }
  )(Form)
}
