import React from 'react'
import { Route } from 'react-router'

import {
  MobilizationTemplatesCreatePage as CreatePage,
  MobilizationTemplatesListPage as ListPage,
  MobilizationTemplatesChoosePage as ChoosePage,
  MobilizationTemplatesChooseCustomListPage as ChooseCustomListPage,
  MobilizationTemplatesChooseGlobalListPage as ChooseGlobalListPage,
} from './pages'

import { MobilizationTemplatesContainer } from './containers'

const path = '/templates'
const param = '/:template_id'
const defaultPath = `${path}${param}`

const MobilizationTemplatesRoutes = parent => [
  <Route component={MobilizationTemplatesContainer}>
    <Route path={`/mobilizations/${path}/list`} component={ListPage} />,
    <Route path={`/${parent}/${path}/create`} component={CreatePage} />,
    <Route path={`/${parent}/${path}/choose`} component={ChoosePage} />,
    <Route path={`/${parent}/${path}/choose/custom/list`} component={ChooseCustomListPage} />,
    <Route path={`/${parent}/${path}/choose/global/list`} component={ChooseGlobalListPage} />
  </Route>
]

export default MobilizationTemplatesRoutes
