import React from 'react'
import { Route } from 'react-router'

// Current module dependencies
import {
  SettingsDonationPage,
  SettingsFinishMessagePage
} from './pages'

const namespace = '/donation'

export default () => [
  <Route path={namespace} component={SettingsDonationPage} />,
  <Route path={`${namespace}/finish`} component={SettingsFinishMessagePage} />
]
