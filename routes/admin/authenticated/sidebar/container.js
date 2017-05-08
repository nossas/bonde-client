import PropTypes from 'prop-types';
import React from 'react';

import { Loading } from '~components/await'
import Sidebar from '~components/navigation/sidebar/sidebar'

const ApplicationContainer = ({ children, loading, sidebarProps }) => (
  <div>
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
