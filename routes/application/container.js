import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'

const ApplicationContainer = ({ children, loading, sidebarProps }) => {
  return loading ? <Loading /> : (
    <Sidebar {...sidebarProps}>
      {children && React.cloneElement(children)}
    </Sidebar>
  )
}

ApplicationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  sidebarProps: PropTypes.object.isRequired,
  relationshipId: PropTypes.number.isRequired,
  // Actions
  asyncFetch: PropTypes.func.isRequired
}

export default ApplicationContainer
