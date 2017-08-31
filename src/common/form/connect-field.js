import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createSelector, createStructuredSelector } from 'reselect'
import { compose, getContext, setPropTypes } from 'recompose'
import { omit } from 'lodash'
import { static as Immutable } from 'seamless-immutable'

import { changeFormValue } from './actions'

export default WrappedComponent => compose(
  setPropTypes({ name: PropTypes.string.isRequired }),
  getContext({ form: PropTypes.string.isRequired }),
  connect(
    createStructuredSelector({
      value: createSelector(
        createSelector(
          state => state.form,
          (state, props) => props.form,
          (formState, formName) => Immutable.getIn(formState, [formName, 'values'], {})
        ),
        (state, props) => props.name,
        (values, field) => values[field]
      )
    }),
    { changeFormValue }
  )
)(class Field extends PureComponent {
  handleChange = e => {
    e.preventDefault()
    this.props.changeFormValue(this.props.form, this.props.name, e.target.value)
  }

  render () {
    return (
      <WrappedComponent
        {...omit(this.props, 'form')}
        onChange={this.handleChange}
      />
    )
  }
})
