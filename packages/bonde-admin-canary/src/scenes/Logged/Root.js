import React from 'react'
import { Page, Header, Navbar } from 'bonde-styleguide'
import { AuthProvider, Route } from '../../services/auth'
import { Page as HomePage } from './scenes/Home'
import { Page as TagsPage } from './scenes/Tags'

const Root = ({ match }) => (
    //<Header>
    //  <Navbar
    //    homePageTitle='Bonde.org'
    //    homePageUrl='http://bonde.org'
    //  />
    //</Header>
    //<Page>
    //</Page>
  <AuthProvider>
    <Route exact path={match.url} component={HomePage} />
    <Route path={`${match.url}/tags`} component={TagsPage} />
  </AuthProvider>
)

export default Root
