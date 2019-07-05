import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
import { ProviderLastLocation } from './services/router'
import { SessionProvider, PrivateRoute, PublicRoute, Route } from './services/auth'
// Routes
import { Root as LoggedRoot } from './scenes/Logged'
import { Root as AuthRoot } from './scenes/Auth'

import { NotFound } from './components'

const Root = () => (
  <SessionProvider>
    <ProviderGraphQL>
      <ProviderRedux>
        <Router>
          <ProviderLastLocation>
            <Switch>
              <PublicRoute
                path='/auth'
                redirectTo='/admin'
                component={AuthRoot}
              />

              <PrivateRoute
                path='/admin'
                redirectTo='/auth/login'
                component={LoggedRoot}
              />

              <Redirect exact from='/' to='/admin' />
              <Route component={NotFound} />
            </Switch>
          </ProviderLastLocation>
        </Router>
      </ProviderRedux>
    </ProviderGraphQL>
  </SessionProvider>
)

export default Root
