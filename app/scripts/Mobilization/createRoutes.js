import React from 'react'
import { Route } from 'react-router'

import { SidebarContainer } from '../Dashboard/containers'
import {
  MobilizationContainer,
  NewMobilizationContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from './containers'
import {
  MobilizationListPage,
  MobilizationBasicsNewFormPage,
  MobilizationBasicsEditFormPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationCustomDomainPage,
  EditMobilizationPage
} from './pages'

import mobilizationTemplatesRoutes from './plugins/Templates/MobilizationTemplatesRoutes'
import blocksCreateRoutes from '../../modules/mobilizations/blocks/routes'
import { createRoutes as widgetCreateRoutes } from './../Widget'

export default requiredLogin => (
  <Route component={MobilizationContainer} onEnter={requiredLogin}>
    <Route path='/' component={MobilizationListPage} />
    <Route path='/mobilizations' component={NewMobilizationContainer}>
      <Route path='/new' component={MobilizationBasicsNewFormPage} />
    </Route>
    {mobilizationTemplatesRoutes('/mobilizations/:mobilization_id')}
    <Route path='/mobilizations/:mobilization_id' component={MobilizationDashboardContainer}>
      <Route path='/edit' component={EditMobilizationPage} />
      {blocksCreateRoutes()}
      {widgetCreateRoutes()}
      <Route component={MobilizationSettingsContainer}>
        <Route path='/basics' component={MobilizationBasicsEditFormPage} />
        <Route path='/analytics' component={MobilizationAnalyticsPage} />
        <Route path='/sharing' component={MobilizationSharingPage} />
        <Route path='/customDomain' component={MobilizationCustomDomainPage} />
      </Route>
    </Route>
  </Route>
)
