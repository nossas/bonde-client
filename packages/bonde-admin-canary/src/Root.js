import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
import { ProviderLastLocation } from './services/router'
// Routes
import { Root as LoggedRoot } from './scenes/Logged'
import { Root as AuthRoot } from './scenes/Auth'
import { PrivateRoute, PublicRoute, Route } from './services/auth'
import { NotFound } from './components'

const Root = () => (
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
)

export default Root
