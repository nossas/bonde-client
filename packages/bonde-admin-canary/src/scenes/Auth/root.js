import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from '../../components'
import { Page as LoginPage } from './scenes/Login'

const Register = () => (<p>This is register page</p>)

const AuthRoot = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/login`} component={LoginPage} />
    <Route path={`${match.url}/register`} component={Register} />
    <Route component={NotFound} />
  </Switch>
)

export default AuthRoot
