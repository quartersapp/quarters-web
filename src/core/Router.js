import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { authenticatedSelector } from 'common/auth'
import { SignupPage } from 'core/signup'
import { Redux } from 'common/components'

const RedirectToSignupIfNotAuth = () => (
  <Redux selector={authenticatedSelector}>
    {({ state: authenticated }) => authenticated ? null : <Redirect to='/signup' />}
  </Redux>
)

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={RedirectToSignupIfNotAuth} />
      <Route path='/signup' component={SignupPage} />
    </div>
  </BrowserRouter>
)

export default Router
