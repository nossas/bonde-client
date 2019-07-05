import React from 'react'
import { Container } from 'bonde-styleguide'
import { Route } from 'services/auth'
import Login from './scenes/Login'
// import Register from './scenes/Register'
import ForgetPassword from './scenes/ForgetPassword'
import ResetPassword from './scenes/ResetPassword'
import PropTypes from 'prop-types'

const AuthRoot = ({ match }) => (
  <Container>
    <Route
      path={`${match.url}/login`}
      component={Login}
    />
    {/**
    <Route
      path={`${match.url}/register`}
      component={Register}
    />
    */}
    <Route
      path={`${match.url}/forget-password`}
      component={ForgetPassword}
    />
    <Route
      path={`${match.url}/reset-password/:token`}
      component={ResetPassword}
    />
  </Container>
)

AuthRoot.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
}

export default AuthRoot
