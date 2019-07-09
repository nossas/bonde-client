import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tab as Tabs, TabItem } from 'bonde-styleguide'

export const Tab = ({ children, to }) => (
  <Link to={to}>
    <TabItem>
      {children}
    </TabItem>
  </Link>
)

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Tabs
