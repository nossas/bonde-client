import React from 'react'
import PrivateRoute from './components/PrivateRoute'
import AuthAPI from './api'

export default ({ redirectTo, ...otherProps }) => (
  <PrivateRoute
    redirectTo={redirectTo || '/auth/login'}
    authenticated={AuthAPI.isAuthenticated()}
    {...otherProps}
  />
)
