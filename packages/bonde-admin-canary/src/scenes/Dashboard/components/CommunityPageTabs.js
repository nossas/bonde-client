import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tab, TabItem } from 'bonde-styleguide'

const PageTabs = ({ location, baseUrl, tabs, ...rest }) => {
  // TODO: should be a default path root
  return (
    <Tab>
      {tabs.map(({ path, name, to }, i) => (
        <TabItem
          key={`default-page-tabs-${i}`}
          active={path.test(location.pathname)}
          to={`${baseUrl}${to || ''}`}
          component={Link}
        >
          {name}
        </TabItem>
      ))}
    </Tab>
  )
}

const { array, shape, string } = PropTypes

PageTabs.propTypes = {
  tabs: array.isRequired,
  location: shape({ pathname: string }).isRequired,
  baseUrl: string.isRequired
}

export default PageTabs
