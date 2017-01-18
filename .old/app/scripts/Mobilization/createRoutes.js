import React from 'react'
import { Route } from 'react-router'

import {
  MobilizationAddContainer,
  MobilizationEditContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from '../../modules/mobilizations/containers'

import {
  FetchTemplatesContainer
} from '../../modules/mobilizations/templates/containers'

import {
  TemplateCreatePage,
  TemplateChoosePage,
  TemplateChooseGlobalPage,
  TemplateChooseCustomPage,
  TemplateListPage
} from '../../modules/mobilizations/templates/pages'

import {
  MobilizationPage,
  MobilizationAddPage,
  MobilizationListPage
} from '../../modules/mobilizations/pages'

import {
  MobilizationBasicsPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationDomainPage
} from '../../modules/mobilizations/pages/settings'

import blocksCreateRoutes from '../../modules/mobilizations/blocks/routes'
import widgetsRoutes from '../../modules/widgets/routes'

export default requiredLogin => (
  <Route component={MobilizationDashboardContainer} onEnter={requiredLogin}>
    <Route path="/" component={MobilizationListPage} />
    <Route path="/mobilizations" component={MobilizationAddContainer}>
      <Route path="/new" component={MobilizationAddPage} />
      <Route path="/:mobilization_id" component={FetchTemplatesContainer}>
        <Route path="/templates/choose" component={TemplateChoosePage} />
        <Route path="/templates/choose/custom" component={TemplateChooseCustomPage} />
        <Route path="/templates/choose/global" component={TemplateChooseGlobalPage} />
      </Route>
    </Route>
    <Route path="/mobilizations/:mobilization_id/templates/create" component={TemplateCreatePage} />
    <Route component={FetchTemplatesContainer}>
      <Route path="/mobilizations/templates/list" component={TemplateListPage} />
    </Route>
    <Route path="/mobilizations/:mobilization_id" component={MobilizationEditContainer}>
      <Route path="/edit" component={MobilizationPage} />
      <Route component={MobilizationSettingsContainer}>
        <Route path="/basics" component={MobilizationBasicsPage} />
        <Route path="/analytics" component={MobilizationAnalyticsPage} />
        <Route path="/sharing" component={MobilizationSharingPage} />
        <Route path="/customDomain" component={MobilizationDomainPage} />
      </Route>
      {blocksCreateRoutes()}
      {widgetsRoutes()}
    </Route>
  </Route>
)
