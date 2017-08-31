import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import { initializeForm, destroyForm, renameForm } from './actions'

export class Form extends Component {
  componentWillMount () {
    this.props.initializeForm(this.props.name)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.name !== this.props.name) {
      this.props.renameForm(this.props.name, nextProps.name)
    }
  }

  componentWillUnmount () {
    this.props.destroyForm(this.props.name)
  }

  /**
   * Set the form name to the context so that field
   * components have access to the form name
   */
  getChildContext () {
    return { form: this.props.name }
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
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node
}

export const formValuesSelector = createSelector(
  (state, props) => props.name,
  state => state.form,
  (formName, formState) => Immutable.static.getIn(formState, [formName, 'values'], {})
)

export default connect(
  createStructuredSelector({ values: formValuesSelector }),
  { initializeForm, renameForm, destroyForm }
)(Form)
