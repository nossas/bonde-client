import React from 'react'
import { Switch } from 'react-router-dom'
import { PublicRoute } from '../../services/auth'
import { NotFound } from '../../components'
import { Page as LoginPage } from './scenes/Login'

const Register = () => (<p>This is register page</p>)

const AuthRoot = ({ match }) => (
  <Switch>
    <PublicRoute path={`${match.url}/login`} component={LoginPage} redirectTo='/' />
    <PublicRoute path={`${match.url}/register`} component={Register} />
    <PublicRoute component={NotFound} />
  </Switch>
)

export default AuthRoot
