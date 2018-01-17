import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import MobSelectors from '~client/mobrender/redux/selectors'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/widgets/__plugins__/form/components'

// Pages
import Adjustments from '~routes/admin/authenticated/sidebar/widgets-form-settings/adjustments/page.connected'
import Autofire from '~routes/admin/authenticated/sidebar/widgets-form-settings/autofire/page.connected'
import Export from '~routes/admin/authenticated/sidebar/widgets-form-settings/export/page.connected'
import Fields from '~routes/admin/authenticated/sidebar/widgets-form-settings/fields/page.connected'
import Finish from '~routes/admin/authenticated/sidebar/widgets-form-settings/finish/page.connected'

class WidgetsForm extends React.Component {
  render () {
    const { match: { path }, mobilization, widget, location } = this.props

    return (
      <SettingsPageLayout className='atomic'>
        <SettingsMenu mobilization={mobilization} widget={widget} location={location} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} component={Adjustments} />
          <Route exact path={`${path}/autofire`} component={Autofire} />
          <Route exact path={`${path}/export`} component={Export} />
          <Route exact path={`${path}/fields`} component={Fields} />
          <Route exact path={`${path}/finish`} component={Finish} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = state => {
  const selectors = MobSelectors(state)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

export default connect(mapStateToProps)(WidgetsForm)
