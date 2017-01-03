import React from 'react'
import { Route } from 'react-router'

import { SettingsContainer } from './containers'

import {
  DonationWidgetSettings,
  ExportWidgetData
} from '../pages'

import {
  AutoFireFormPage
} from './settings'

import { createRoutes as matchCreateRoutes } from './plugins/Match'
import { createRoutes as pressureCreateRoutes } from './plugins/PressureWidget'
import { createRoutes as formCreateRoutes } from './plugins/Form'
import { createRoutes as donationCreateRoutes } from './plugins/Donation'

import Container from '../Dashboard/Container'

export default () => (
  <Route path='/widgets/:widget_id' component={SettingsContainer}>
    {pressureCreateRoutes()}
    {formCreateRoutes()}
    {matchCreateRoutes()}
    {donationCreateRoutes()}
    <Route path='/autofire' component={AutoFireFormPage} />
    <Route path='/export' component={ExportWidgetData} />
    <Route path='/donation' component={DonationWidgetSettings} />
  </Route>
)
