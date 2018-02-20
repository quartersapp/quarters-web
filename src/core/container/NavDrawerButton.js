import React, { Component } from 'react'
import PropTypes from 'prop-types'
import css from './style.scss'

class NavDrawerButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <button className={css.navDrawerButton} onClick={this.props.onClick}>
        <svg viewBox='0 0 20 9' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <g id='Screens' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='square'>
            <g id='Band---Accoms-Request' transform='translate(-282.000000, -25.000000)' stroke='#979797'>
              <path d='M283.375,25.5 L300.625,25.5' id='Line' />
              <path d='M283.375,33.5 L300.625,33.5' id='Line' />
              <path d='M283.375,29.5 L300.625,29.5' id='Line' />
            </g>
          </g>
        </svg>
      </button>
    )
  }
}

export default NavDrawerButton
