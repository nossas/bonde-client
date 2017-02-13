import React from 'react'
import { Route } from 'react-router'

import { BackgroundContainer } from '../Dashboard/containers'
import { SidebarContainer } from '~components/navigation/sidebar'

import {
  EditUserPage,
  LoginPageWrapper,
  LogoutPage,
  RegisterPage
} from './pages'


export default (requiredLogin, redirectUrl) => [
  <Route key="account" component={BackgroundContainer}>
    <Route path="/login" component={LoginPageWrapper(redirectUrl)} />
    <Route path="/logout" component={LogoutPage} />
    <Route path="/register" component={RegisterPage} />
  </Route>,
  <Route key="account-logged" path="/account" component={SidebarContainer} onEnter={requiredLogin}>
    <Route path="/edit" component={EditUserPage} />
  </Route>
]
