import React, { PropTypes } from 'react'

import Menu from './Menu'
import { SettingsPageLayout } from '../../../../../../components/Layout'

const Base = ({ children, location, mobilization, widget }) => (
  <SettingsPageLayout>
    <Menu
      location={location}
      mobilization_id={mobilization.id}
      widget_id={widget.id}
    />
    {children}
  </SettingsPageLayout>
)

Base.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default Base
