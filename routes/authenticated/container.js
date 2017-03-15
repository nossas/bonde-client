import React, { PropTypes } from 'react'
import DevTools from '~components/dev-tools'
import { ZendeskWidget } from '~components/external-services'

const ApplicationContainer = ({ children }) => (
  <div>
    <ZendeskWidget />
    {process.env.NODE_ENV === 'development' ? <DevTools /> : ''}
    {children && React.cloneElement(children)}
  </div>
)

ApplicationContainer.propTypes = {
  children: PropTypes.node.isRequired
}

// ApplicationContainer.context

export default ApplicationContainer
