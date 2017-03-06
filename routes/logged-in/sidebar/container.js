import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'
import { ZendeskWidget } from '~components/external-services'

const ApplicationContainer = ({ children, loading, sidebarProps }) => {
  return loading ? <Loading /> : (
    <div>
      <ZendeskWidget />
      <Sidebar {...sidebarProps}>
        {children && React.cloneElement(children)}
      </Sidebar>
    </div>
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
