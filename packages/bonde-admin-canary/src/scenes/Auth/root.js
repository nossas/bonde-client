import React from 'react'
import { Container, Title } from 'bonde-styleguide'
import { Route } from '../../services/auth'
import { Page as LoginPage } from './scenes/Login'
import { Page as RegisterPage } from './scenes/Register'

const AuthRoot = ({ match }) => (
  <Container>
    <Title.H1 margin={{ bottom: 37 }}>
      O Bonde tá na área!
      Chega mais.
    </Title.H1>
    <React.Fragment>
      <Route
        path={`${match.url}/login`}
        component={LoginPage}
      />
      <Route
        path={`${match.url}/register`}
        component={RegisterPage}
      />
    </React.Fragment>
  </Container>
)

export default AuthRoot
