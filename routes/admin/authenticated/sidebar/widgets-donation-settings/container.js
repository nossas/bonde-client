import PropTypes from 'prop-types';
import React from 'react';
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/widgets/__plugins__/donation/components'

const Container = ({ children, ...props }) => (
  <SettingsPageLayout>
    <SettingsMenu mobilization={props.mobilization} widget={props.widget} location={props.location} />
    <SettingsPageContentLayout>
      {children && React.cloneElement(children, props)}
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

Container.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default Container
