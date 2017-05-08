import PropTypes from 'prop-types';
import React from 'react';

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { DivFloat, Button } from '~client/ux/components'

const PageHeader = ({ location }) => {
  const activeMobilizationsListPath = paths.mobilizations()
  const mobilizationsTemplatesListPath = paths.mobilizationTemplatesList()
  return (
    <div>
      <DivFloat>
        <Button to={paths.newMobilization()}>
          <i className='fa fa-plus mr2' style={{ fontSize: '.75rem' }} />
          Nova mobilização
        </Button>
      </DivFloat>
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
