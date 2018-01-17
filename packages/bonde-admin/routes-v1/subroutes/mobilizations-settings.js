import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/components'
import MobSelectors from '~client/mobrender/redux/selectors'
import { selectMobilization } from '~client/mobrender/redux/action-creators'

// Pages
import MobilizationsAnalytics from '~routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.connected'
import MobilizationsBasics from '~routes/admin/authenticated/sidebar/mobilizations-settings-basics/page.connected'
import MobilizationsCustomDomain from '~routes/admin/authenticated/sidebar/mobilizations-settings-domain/page.connected'
import MobilizationsMetrics from '~routes/admin/authenticated/sidebar/mobilizations-settings-metrics/page.connected'
import MobilizationsSharing from '~routes/admin/authenticated/sidebar/mobilizations-settings-sharing/page.connected'

class MobilizationsSettings extends React.Component {
  componentDidMount () {
    const { match: { params }, hasCurrentMobilization, selectMobilization } = this.props

    !hasCurrentMobilization && selectMobilization(params.mobilization_id)
  }

  render () {
    const { location, mobilization, match: { path } } = this.props
    return (
      <SettingsPageLayout>
        <SettingsMenu location={location} mobilization={mobilization} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}/analytics`} component={MobilizationsAnalytics} />
          <Route exact path={`${path}/basics`} component={MobilizationsBasics} />
          <Route exact path={`${path}/customDomain`} component={MobilizationsCustomDomain} />
          <Route exact path={`${path}/metrics`} component={MobilizationsMetrics} />
          <Route exact path={`${path}/sharing`} component={MobilizationsSharing} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const selector = MobSelectors(state, props)

  return {
    hasCurrentMobilization: selector.hasCurrentMobilization(),
    mobilization: selector.getMobilization() || {}
  }
}

const mapDispatchToProps = { selectMobilization }

export default connect(mapStateToProps, mapDispatchToProps)(MobilizationsSettings)
