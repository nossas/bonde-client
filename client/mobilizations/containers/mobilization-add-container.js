import React from 'react'

// Global module dependencies
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'

const MobilizationAddContainer = ({ children, location }) => {
  const goalIsActive = location && location.pathname === paths.newMobilization()
  const templateIsActive = location && /\/\w+\/[0-9]+\/templates\/choose/.test(location.pathname)

  return (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Nova mobilização'>
        <Tabs>
          <Tab text='Objetivo' isActive={goalIsActive} index={1} />
          <Tab text='Templates' isActive={templateIsActive} index={2} />
        </Tabs>
      </SettingsPageMenuLayout>
      <SettingsPageContentLayout wrapClassName='md-col-12 lg-col-6 mx-auto'>
        {children}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

export default MobilizationAddContainer
