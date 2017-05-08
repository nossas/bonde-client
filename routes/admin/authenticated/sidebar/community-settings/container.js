import PropTypes from 'prop-types'
import React from 'react'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/community/components'

const SettingsContainer = ({ children, location }) => (
  <SettingsPageLayout>
    <SettingsMenu location={location} />
    <SettingsPageContentLayout>
      {children}
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

SettingsContainer.propTypes = {
  location: PropTypes.object
}

export default SettingsContainer
