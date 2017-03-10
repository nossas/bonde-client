import React, { PropTypes } from 'react'
import { SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu } from '~widget-plugins/form/components'

const Container = ({ children, ...props }) => (
  <div className='flex-auto flex flex-column bg-silver atomic relative'>
    <SettingsMenu mobilization={props.mobilization} widget={props.widget} location={props.location} />
    <SettingsPageContentLayout>
      {children && React.cloneElement(children, props)}
    </SettingsPageContentLayout>
  </div>
)

Container.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default Container
