// Children module dependencies
// import { TemplateCreatePage, TemplateChoosePage, TemplateChooseGlobalPage, TemplateChooseCustomPage, TemplateListPage } from '~mobilizations/templates/pages'
// import { FetchTemplatesContainer } from '~mobilizations/templates/containers'
// import blocksCreateRoutes from '~mobilizations/blocks/routes'
// import widgetsRoutes from '~mobilizations/widgets/routes'

// Current module dependencies
// import { MobilizationAddContainer, MobilizationEditContainer, MobilizationDashboardContainer, MobilizationSettingsContainer } from '~mobilizations/containers'
// import { MobilizationPage, MobilizationAddPage, MobilizationListPage } from '~mobilizations/pages'
// import { MobilizationBasicsPage, MobilizationAnalyticsPage, MobilizationSharingPage, MobilizationDomainPage } from '~mobilizations/pages/settings'

export default requiredLogin => ({})

// <Route component={MobilizationDashboardContainer} onEnter={requiredLogin}>                                       <~ Migrated!
//   <Route path='/' component={MobilizationListPage} />                                                            <~ Migrated!
//   <Route path='/mobilizations' component={MobilizationAddContainer}>                                 <~ Removed!
//     <Route path='/new' component={MobilizationAddPage} />                                                        <~ Migrated!
//     <Route path='/:mobilization_id' component={FetchTemplatesContainer}>                             <~ Removed!
//       <Route path='/templates/choose' component={TemplateChoosePage} />                                          <~ Migrated!
//       <Route path='/templates/choose/custom' component={TemplateChooseCustomPage} />                             <~ Migrated!
//       <Route path='/templates/choose/global' component={TemplateChooseGlobalPage} />                             <~ Migrated!
//     </Route>                                                                                         <~ Removed!
//   </Route>                                                                                                       <~ Migrated!
//   <Route path='/mobilizations/:mobilization_id/templates/create' component={TemplateCreatePage} />               <~ Migrated!
//   <Route component={FetchTemplatesContainer}>                                                        <~ Removed!
//     <Route path='/mobilizations/templates/list' component={`TemplateListPage`} />                                <~ Migrated!
//   </Route>                                                                                           <~ Removed!
//   <Route path='/mobilizations/:mobilization_id' component={MobilizationEditContainer}>               <~ Removed!
//     <Route path='/edit' component={MobilizationPage} />                                                          <~ Migrated!
//     <Route component={MobilizationSettingsContainer}>                                                            <~ Migrated!
//       <Route path='/basics' component={MobilizationBasicsPage} />                                                <~ Migrated!
//       <Route path='/analytics' component={MobilizationAnalyticsPage} />                                          <~ Migrated!
//       <Route path='/sharing' component={MobilizationSharingPage} />                                              <~ Migrated!
//       <Route path='/customDomain' component={MobilizationDomainPage} />                                          <~ Migrated!
//     </Route>                                                                                         <~ Removed!
//     {blocksCreateRoutes()}
//     {widgetsRoutes()}
//   </Route>                                                                                           <~ Removed!
// </Route>                                                                                                         <~ Migrated!
