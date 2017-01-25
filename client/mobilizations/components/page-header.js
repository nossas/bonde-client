import React, { PropTypes } from 'react'
import { Link } from 'react-router'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'

const PageHeader = ({ location }) => {
  const activeMobilizationsListPath = paths.mobilizations()
  const mobilizationsTemplatesListPath = paths.mobilizationTemplatesList()
  return (
    <div>
      <Link
        to={paths.newMobilization()}
        className='btn white bg-pagenta caps h4 py2 right rounded float-button'
      >
        <i className='fa fa-plus mr2' style={{ fontSize: '.75rem' }} />
        Nova mobilização
      </Link>
      <Tabs>
        <Tab
          path={activeMobilizationsListPath}
          text='Ativas'
          isActive={activeMobilizationsListPath === location.pathname}
        />
        <Tab
          path={mobilizationsTemplatesListPath}
          text='Templates'
          isActive={mobilizationsTemplatesListPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

PageHeader.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default PageHeader
