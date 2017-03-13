import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'
import { ZendeskWidget } from '~components/external-services'
import DevTools from '~components/dev-tools'

const ApplicationContainer = ({ children, loading, sidebarProps }) => {
  return loading ? <Loading /> : (
    <div>
      <ZendeskWidget />
      {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
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
  relationshipId: PropTypes.number.isRequired
}

export default ApplicationContainer
