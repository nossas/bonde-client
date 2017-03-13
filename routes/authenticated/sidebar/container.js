import React, { Component, PropTypes } from 'react'

import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'
import { ZendeskWidget } from '~components/external-services'
import DevTools from '~components/dev-tools'


const ApplicationContainer = ({ children, loading, sidebarProps }) => (
  <div>
    <ZendeskWidget />
    {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
    {loading ? <Loading /> : (
      <Sidebar {...sidebarProps}>
        {children && React.cloneElement(children)}
      </Sidebar>
    )}
  </div>
)

ApplicationContainer.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  sidebarProps: PropTypes.object.isRequired
}

ApplicationContainer.context

export default ApplicationContainer
