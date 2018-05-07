import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ProviderRedux } from './services/redux'
import { ProviderGraphQL } from './services/graphql'
// Routes
import { Page as HomePage } from './scenes/Home'
import { Root as AuthRoot } from './scenes/Auth'
import { NotFound } from './components'

const Root = () => (
  <ProviderGraphQL>
    <ProviderRedux>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/auth' component={AuthRoot} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ProviderRedux>
  </ProviderGraphQL>
)

export default Root
