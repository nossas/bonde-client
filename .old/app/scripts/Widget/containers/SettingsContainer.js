import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import * as WidgetSelectors from '../WidgetSelectors'
import { SettingsPageLayout } from '../../../components/Layout'

export const Settings = ({ children, ...rest }) => (
  <SettingsPageLayout>
    {children && React.cloneElement(children, {...rest})}
  </SettingsPageLayout>
)

Settings.propTypes = {
  children: PropTypes.object,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  widget: WidgetSelectors.getWidget(state, ownProps),
  credentials: state.auth.credentials
})

export default connect(mapStateToProps)(Settings)
