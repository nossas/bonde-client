import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as MobilizationSelectors from '../selectors'

import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '../../../components/Layout'
import { Tabs, Tab } from '../../../components/Navigation'
import * as Paths from '../../../scripts/Paths'


const MobilizationSettingsContainer = (props) => {
  const { children, mobilization: { id }, location: { pathname } } = props

  const basicsPath = Paths.basicsMobilization(id)
  const sharingPath = Paths.sharingMobilization(id)
  const analyticsPath = Paths.analyticsMobilization(id)
  const customDomainPath = Paths.customDomainMobilization(id)

  return (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure sua mobilização'>
        <Tabs>
          <Tab
            text='Informações básicas'
            path={basicsPath}
            isActive={basicsPath === pathname}
          />
          <Tab
            text='Compartilhamento'
            path={sharingPath}
            isActive={sharingPath === pathname}
          />
          <Tab
            text='Google Analytics'
            path={analyticsPath}
            isActive={analyticsPath === pathname}
          />
          <Tab
            text='Domínio'
            path={customDomainPath}
            isActive={customDomainPath === pathname}
          />
        </Tabs>
      </SettingsPageMenuLayout>
      <SettingsPageContentLayout>
        {children}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

MobilizationSettingsContainer.propTypes = {
  mobilization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  mobilization: MobilizationSelectors.getCurrent(state)
})

export default connect(mapStateToProps)(MobilizationSettingsContainer)
