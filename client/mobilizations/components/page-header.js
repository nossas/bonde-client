import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

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
          <FormattedMessage
            id='mobilizations.components--page-header.button.text'
            defaultMessage='Nova mobilização'
          />
        </Button>
      </DivFloat>
      <Tabs>
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--page-header.tabs.actives'
              defaultMessage='Ativas'
            />
          }
          path={activeMobilizationsListPath}
          isActive={activeMobilizationsListPath === location.pathname}
        />
        <Tab
          text={
            <FormattedMessage
              id='mobilizations.components--page-header.tabs.templates'
              defaultMessage='Templates'
            />
          }
          path={mobilizationsTemplatesListPath}
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
