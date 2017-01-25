import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~components/layout'
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'

// Current module dependencies
import * as MobilizationSelectors from '../selectors'

export const MobilizationSettingsContainer = props => {
  const { children, mobilization: { id }, location: { pathname } } = props

  const basicsPath = paths.basicsMobilization(id)
  const sharingPath = paths.sharingMobilization(id)
  const analyticsPath = paths.analyticsMobilization(id)
  const customDomainPath = paths.customDomainMobilization(id)

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
