import React from 'react'
import { Route } from 'react-router'

import { SettingsFieldsPage, SettingsFormPage, SettingsFinishMessagePage } from './pages'

export default () => [
  <Route path='/form' key='settings-form' component={SettingsFormPage} />,
  <Route path='/fields' key='settings-fields' component={SettingsFieldsPage} />,
  <Route path='/finish' key='settings-finish-message-page' component={SettingsFinishMessagePage} />
]
