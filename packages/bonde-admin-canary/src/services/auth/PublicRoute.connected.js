import React from 'react'
import PublicRoute from './components/PublicRoute'
import AuthAPI from './api'

export default (props) => (
  <PublicRoute
    authenticated={AuthAPI.isAuthenticated()}
    {...props}
  />
)
