import React from 'react'
import { Route } from 'services/auth'
import { Page, Header } from 'components/PageLogged'
import { WorkflowEditPage, WorkflowListPage } from './scenes'

const COMMUNITY = { id: 1, name: 'Bonde' }

const Root = ({ match }) => (
  <Page renderTitle={() => (<Header.Title>{COMMUNITY.name}</Header.Title>)}>
    <Route
      exact
      path={match.url}
      component={() => <WorkflowListPage community={COMMUNITY} />}
    />
    <Route
      path={`${match.url}/:flowId/flow`}
      component={(props) => <WorkflowEditPage {...props} community={COMMUNITY} />}
    />
  </Page>
)

export default Root
