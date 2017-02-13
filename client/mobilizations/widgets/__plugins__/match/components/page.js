import React from 'react'

// Global module dependencies
import { SettingsPageLayout } from '../../../../../components/layout'

// Current module dependencies
import { SettingsMenu } from '../components'

const MatchPage = ({ widget, mobilization, location, children }) => (
  <SettingsPageLayout>
    <SettingsMenu
      widget={widget}
      mobilization={mobilization}
      location={location}
    />
    {children}
  </SettingsPageLayout>
)

export default MatchPage
