import PropTypes from 'prop-types'
import React from 'react'
import { SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/widgets/__plugins__/form/components'

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
