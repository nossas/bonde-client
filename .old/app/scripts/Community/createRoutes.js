import React from 'react'
import { Route } from 'react-router'
import { BackgroundContainer, SidebarContainer } from '../Dashboard/containers'

import { EditContainer } from './containers'
import { AddPage, ListPage, InfoPage, MailchimpPage, RecipientPage } from './pages'


export default requiredLogin => [
  <Route component={BackgroundContainer} onEnter={requiredLogin}>
    <Route path="/community" component={ListPage} />
    <Route path="/community/new" component={AddPage} />
  </Route>,
  <Route component={SidebarContainer} onEnter={requiredLogin}>
    <Route component={EditContainer}>
      <Route path="/community/info" component={InfoPage} />
      <Route path="/community/mailchimp" component={MailchimpPage} />
      <Route path="/community/recipient" component={RecipientPage} />
    </Route>
  </Route>
]
