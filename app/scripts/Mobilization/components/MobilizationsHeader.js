import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import * as Paths from '../../Paths'
import { Tabs, Tab } from '../../../components/Navigation'

const MobilizationsHeader = ({ location }) => {
  const activeMobilizationsListPath = Paths.mobilizations()
  const mobilizationsTemplatesListPath = Paths.mobilizationTemplatesList()
  return (
    <div>
      <Link
        to={Paths.newMobilization()}
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

MobilizationsHeader.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default MobilizationsHeader
