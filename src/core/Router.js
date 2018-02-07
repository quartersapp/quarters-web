import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { authenticatedSelector } from 'common/auth'
import { SignupPage } from 'core/signup'
import { Redux } from 'common/components'

const RedirectIfNotAuth = ({ children = null, to = '/signup' }) => (
  <Redux selector={authenticatedSelector}>
    {({ state: authenticated }) => authenticated ? children : <Redirect to={to} />}
  </Redux>
)

const RedirectIfAuth = ({ children, to }) => (
  <Redux selector={authenticatedSelector}>
    {({ state: authenticated }) => authenticated ? <Redirect to={to} /> : children}
  </Redux>
)

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={RedirectIfNotAuth} />
      <Route exact path='/signup' render={() => (
        <RedirectIfAuth to='/'>
          <SignupPage />
        </RedirectIfAuth>
      )} />
    </div>
  </BrowserRouter>
)

export default Router
