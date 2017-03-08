import React, { PropTypes } from 'react'

import {
  SettingsPageLayout,
  SettingsPageContentLayout
} from '~components/layout'
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'

const PageCentralizedStepsLayout = ({ children, location, mobilization: { id }, title }) => {
  const launchIsActive = location.pathname === paths.mobilizationLaunch(id)

  return (
    <SettingsPageLayout>
      <SettingsPageContentLayout
        className='table col-12 full-height center'
        wrapClassName='table-cell align-middle lg-col-5 md-col-8'
      >
        <h2 className='h1 mt0 mb3'>{title}</h2>
        <Tabs>
          <Tab style={{ margin: 0 }} isActive={launchIsActive} index={1} />
        </Tabs>
        {children}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  )
}

PageCentralizedStepsLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
}

export default PageCentralizedStepsLayout
