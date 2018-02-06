import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import * as auth from 'common/auth'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const RedirectToSignupIfNotAuth = connect(
  createStructuredSelector({
    authenticated: auth.selectors.authenticated
  })
)(({ authenticated, Component }) => authenticated ? null : <Redirect to='/signup' />)

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={RedirectToSignupIfNotAuth} />
    </div>
  </BrowserRouter>
)

export default Router
