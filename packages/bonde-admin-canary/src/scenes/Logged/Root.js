import React from 'react'
import { Page, Header, Navbar } from 'bonde-styleguide'
import { AuthProvider, Route } from '../../services/auth'
import { Page as HomePage } from './scenes/Home'
import { Page as TagsPage } from './scenes/Tags'

const Root = ({ match }) => (
  <AuthProvider>
    <Header>
      <Navbar
        homePageTitle='Bonde.org'
        homePageUrl='http://bonde.org'
      />
    </Header>
    <Page>
      <Route exact path={match.url} component={HomePage} />
      <Route path={`${match.url}/tags`} component={TagsPage} />
    </Page>
  </AuthProvider>
)

export default Root
