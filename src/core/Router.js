import React from 'react'
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { authenticatedSelector } from 'common/auth'
import { LandingPage } from 'core/landing'
import { Redux } from 'common/components'
import { Container } from './container'

const RedirectIfNotAuth = ({ children = null, to = '/landing' }) => (
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
    <Container>
      <Route exact path='/' component={RedirectIfNotAuth} />
      <Route exact path='/landing' render={() => (
        <RedirectIfAuth to='/'>
          <LandingPage />
        </RedirectIfAuth>
      )} />
    </Container>
  </BrowserRouter>
)

export default Router
