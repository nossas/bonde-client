import React from 'react'

import * as Paths from '../../../../Paths'
import { Menu } from './'
import { SettingsPageLayout } from '../../../../../components/Layout'

const MatchPage = ({ widget, mobilization, location, children }) => (
  <SettingsPageLayout>
    <Menu
      widget={widget}
      mobilization={mobilization}
      location={location}
    />
    {children}
  </SettingsPageLayout>
)

export default MatchPage
