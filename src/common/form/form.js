import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Immutable from 'seamless-immutable'
import PropTypes from 'prop-types'
import {
  compose,
  setPropTypes,
  withContext,
  defaultProps,
  setDisplayName
} from 'recompose'
import { initializeForm, destroyForm, renameForm } from './actions'

export const formValuesSelector = createSelector(
  (state, props) => props.name,
  state => state.form,
  (formName, formState) => Immutable.static.getIn(formState, [formName, 'values'], {})
)

export const Form = compose(
  setDisplayName('Form'),
  defaultProps({ destroyOnUnmount: true }),
  setPropTypes({
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    /* If set to true, will dispatch action to destroy form state on unmount */
    destroyOnUnmount: PropTypes.bool.isRequired
  }),
  withContext(
    { form: PropTypes.string },
    props => ({ form: props.name })
  )
)(class Form extends PureComponent {
  componentWillMount () {
    this.props.initializeForm(this.props.name)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.name !== this.props.name) {
      this.props.renameForm(this.props.name, nextProps.name)
    }
  }

  componentWillUnmount () {
    if (this.props.destroyOnUnmount) {
      this.props.destroyForm(this.props.name)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.values)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>{this.props.children}</form>
    )
  }
})

export default connect(
  createStructuredSelector({ values: formValuesSelector }),
  { initializeForm, renameForm, destroyForm }
)(Form)
