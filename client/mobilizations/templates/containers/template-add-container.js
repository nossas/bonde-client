import React from 'react'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../../components/Layout'


export default ({ children, ...props }) => (
  <SettingsPageLayout>
    <SettingsPageMenuLayout title="Crie um template a partir da mobilização" />
    <SettingsPageContentLayout>
     {children && React.cloneElement(children)}
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)
