import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeFormValue } from './actions'

const createFormField = () => WrappedComponent => {
  class FormField extends Component {
    getFormName () {
      return this.context.form
    }

    handleChange = e => {
      e && e.preventDefault()
      this.props.changeFormValue(this.getFormName(), this.props.name, e.target.value)
    }

    render () {
      const form = this.getFormName()
      const field = this.props.name
      const value = this.props.formState[form].values[field]

      return (
        <WrappedComponent {...this.props} onChange={this.handleChange} value={value} />
      )
    }
  }

  FormField.propTypes = {
    name: PropTypes.string.isRequired,
    formState: PropTypes.object.isRequired
  }

  FormField.contextTypes = {
    form: PropTypes.string
  }

  return connect(
    state => ({ formState: state.form }),
    { changeFormValue }
  )(FormField)
}

export default createFormField
