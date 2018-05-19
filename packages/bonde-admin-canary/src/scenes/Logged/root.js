import React from 'react'
import { Page } from 'bonde-styleguide'
import { Route } from '../../services/auth'
import { Page as HomePage } from './scenes/Home'
import { Page as TagsPage } from './scenes/Tags'

const Root = ({ match }) => (
  <Page>
    <Route exact path={match.url} component={HomePage} />
    <Route path={`${match.url}/tags`} component={TagsPage} />
  </Page>
)

export default Root
