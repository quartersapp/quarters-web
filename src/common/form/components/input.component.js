import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeFormValue } from '../actions'

const Input = props => <input {...props} />

const createFormField = () => WrappedComponent => {
  class FormField extends Component {
    propTypes = {
      name: PropTypes.string.isRequired,
      formState: PropTypes.object.isRequired
    }

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

      return ( // TODO look into pure component for here
        <WrappedComponent {...this.props} onChange={this.handleChange} value={value} />
      )
    }
  }

  return connect(
    state => ({ formState: state.form }),
    { changeFormValue }
  )(FormField)
}

export default createFormField()(Input)
