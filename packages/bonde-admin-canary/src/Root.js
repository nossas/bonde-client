import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ProviderRedux } from './services/redux'
// Routes
import { Page as HomePage } from './scenes/Home'
import { Root as AuthRoot } from './scenes/Auth'
import { NotFound } from './components'

const Root = () => (
  <ProviderRedux>
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/auth' component={AuthRoot} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ProviderRedux>
)

export default Root
