import PropTypes from 'prop-types';
import React from 'react';
import { SettingsPageContentLayout } from '~client/components/layout'
import { SettingsBase } from '~client/mobilizations/widgets/__plugins__/pressure/components'

const Container = ({ children, ...props }) => (
  <SettingsBase mobilization={props.mobilization} widget={props.widget} location={props.location}>
    <SettingsPageContentLayout>
      {children && React.cloneElement(children, props)}
    </SettingsPageContentLayout>
  </SettingsBase>
)

Container.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default Container
