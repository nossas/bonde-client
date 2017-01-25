import React from 'react'
import { Route } from 'react-router'

// Children module dependencies
import {
  TemplateCreatePage,
  TemplateChoosePage,
  TemplateChooseGlobalPage,
  TemplateChooseCustomPage,
  TemplateListPage
} from '~mobilizations/templates/pages'
import { FetchTemplatesContainer } from '~mobilizations/templates/containers'
import blocksCreateRoutes from '~mobilizations/blocks/routes'
import widgetsRoutes from '~mobilizations/widgets/routes'

// Current module dependencies
import {
  MobilizationAddContainer,
  MobilizationEditContainer,
  MobilizationDashboardContainer,
  MobilizationSettingsContainer
} from '~mobilizations/containers'
import {
  MobilizationPage,
  MobilizationAddPage,
  MobilizationListPage
} from '~mobilizations/pages'
import {
  MobilizationBasicsPage,
  MobilizationAnalyticsPage,
  MobilizationSharingPage,
  MobilizationDomainPage
} from '~mobilizations/pages/settings'

export default requiredLogin => (
  <Route component={MobilizationDashboardContainer} onEnter={requiredLogin}>
    <Route path='/' component={MobilizationListPage} />
    <Route path='/mobilizations' component={MobilizationAddContainer}>
      <Route path='/new' component={MobilizationAddPage} />
      <Route path='/:mobilization_id' component={FetchTemplatesContainer}>
        <Route path='/templates/choose' component={TemplateChoosePage} />
        <Route path='/templates/choose/custom' component={TemplateChooseCustomPage} />
        <Route path='/templates/choose/global' component={TemplateChooseGlobalPage} />
      </Route>
    </Route>
    <Route path='/mobilizations/:mobilization_id/templates/create' component={TemplateCreatePage} />
    <Route component={FetchTemplatesContainer}>
      <Route path='/mobilizations/templates/list' component={TemplateListPage} />
    </Route>
    <Route path='/mobilizations/:mobilization_id' component={MobilizationEditContainer}>
      <Route path='/edit' component={MobilizationPage} />
      <Route component={MobilizationSettingsContainer}>
        <Route path='/basics' component={MobilizationBasicsPage} />
        <Route path='/analytics' component={MobilizationAnalyticsPage} />
        <Route path='/sharing' component={MobilizationSharingPage} />
        <Route path='/customDomain' component={MobilizationDomainPage} />
      </Route>
      {blocksCreateRoutes()}
      {widgetsRoutes()}
    </Route>
  </Route>
)
