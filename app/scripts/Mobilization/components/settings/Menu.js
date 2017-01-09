import React, { PropTypes } from 'react'

import * as Paths from '../../../Paths'
import { Tabs, Tab } from '../../../../components/Navigation'
import { SettingsPageMenuLayout } from '../../../../components/Layout'

const MobilizationSettingsMenu = ({ mobilization, location }) => {
  const basicsMobilizationPath = Paths.basicsMobilization(mobilization.id)
  const sharingMobilizationPath = Paths.sharingMobilization(mobilization.id)
  const analyticsMobilizationPath = Paths.analyticsMobilization(mobilization.id)
  const customDomainMobilizationPath = Paths.customDomainMobilization(mobilization.id)

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

MobilizationSettingsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default MobilizationSettingsMenu
