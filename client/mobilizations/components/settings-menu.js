import React, { PropTypes } from 'react'

import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'
import { SettingsPageMenuLayout } from '~components/layout'

const SettingsMenu = ({ mobilization, location }) => {
  const basicsMobilizationPath = paths.basicsMobilization(mobilization.id)
  const sharingMobilizationPath = paths.sharingMobilization(mobilization.id)
  const analyticsMobilizationPath = paths.analyticsMobilization(mobilization.id)
  const customDomainMobilizationPath = paths.customDomainMobilization(mobilization.id)

  return (
    <SettingsPageMenuLayout title='Configure sua mobilização'>
      <Tabs>
        <Tab
          text='Informações básicas'
          path={basicsMobilizationPath}
          isActive={basicsMobilizationPath === location.pathname}
        />
        <Tab
          text='Compartilhamento'
          path={sharingMobilizationPath}
          isActive={sharingMobilizationPath === location.pathname}
        />
        <Tab
          text='Google Analytics'
          path={analyticsMobilizationPath}
          isActive={analyticsMobilizationPath === location.pathname}
        />
        <Tab
          text='Domínio'
          path={customDomainMobilizationPath}
          isActive={customDomainMobilizationPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default SettingsMenu
