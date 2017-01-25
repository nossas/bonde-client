import React from 'react'
import { Route } from 'react-router'

// Global module dependencies
import { BackgroundContainer } from '~tmp-dashboard/containers'

// Current module dependencies
import { EditContainer } from './containers'
import { AddPage, ListPage, InfoPage, MailchimpPage, RecipientPage } from './pages'

const namespace = '/community'

export default requiredLogin => [
  <Route component={BackgroundContainer} onEnter={requiredLogin}>
    <Route path={`${namespace}`} component={ListPage} />
    <Route path={`${namespace}/new`} component={AddPage} />
  </Route>,
  <Route component={EditContainer} onEnter={requiredLogin}>
    <Route path={`${namespace}/info`} component={InfoPage} />
    <Route path={`${namespace}/mailchimp`} component={MailchimpPage} />
    <Route path={`${namespace}/recipient`} component={RecipientPage} />
  </Route>
]
