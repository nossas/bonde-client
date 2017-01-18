import React from 'react'
import { Route } from 'react-router'

// Current module dependencies
import { SettingsContainer } from './containers'
import { AutofireFormPage, DataExportPage } from './pages'

// Plugins module dependencies
import PluginsRoutes from './__plugins__/routes'

const namespace = '/widgets/:widget_id'

export default () => (
  <Route path={namespace} component={SettingsContainer}>
    <Route path='/autofire' key='autofire-form-page' component={AutofireFormPage} />
    <Route path='/export' key='data-export-page' component={DataExportPage} />
    {PluginsRoutes()}
  </Route>
)
