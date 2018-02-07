import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { authenticatedSelector } from 'common/auth'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { SignupPage } from 'core/signup'

const RedirectToSignupIfNotAuth = connect(
  createStructuredSelector({
    authenticated: authenticatedSelector
  })
)(({ authenticated, Component }) => authenticated ? null : <Redirect to='/signup' />)

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={RedirectToSignupIfNotAuth} />
      <Route path='/' component={SignupPage} />
    </div>
  </BrowserRouter>
)

export default Router
