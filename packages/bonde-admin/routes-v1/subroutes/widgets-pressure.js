import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import MobSelectors from '~client/mobrender/redux/selectors'
import { SettingsPageContentLayout } from '~client/components/layout'
import { SettingsBase } from '~client/mobilizations/widgets/__plugins__/pressure/components'

// Pages
import Adjustments from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/adjustments/page.connected'
import Autofire from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/autofire/page.connected'
import Email from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.connected'
import Finish from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/finish/page.connected'

class WidgetsPressure extends React.Component {
  render () {
    const { match: { path }, mobilization, widget, location } = this.props

    return (
      <SettingsBase mobilization={mobilization} widget={widget} location={location}>
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} component={Adjustments} />
          <Route exact path={`${path}/autofire`} component={Autofire} />
          <Route exact path={`${path}/email`} component={Email} />
          <Route exact path={`${path}/finish`} component={Finish} />
        </SettingsPageContentLayout>
      </SettingsBase>
    )
  }
}

const mapStateToProps = (state, props) => {
  const selectors = MobSelectors(state, props)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

export default connect(mapStateToProps)(WidgetsPressure)
