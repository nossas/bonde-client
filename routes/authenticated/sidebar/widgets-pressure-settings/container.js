import React, { PropTypes } from 'react'
import { SettingsPageContentLayout } from '~components/layout'
import { SettingsBase } from '~widget-plugins/pressure/components'

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
