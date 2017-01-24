import React, { PropTypes } from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'
import { SettingsPageMenuLayout } from '~components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const donationPath = paths.donation(mobilization.id, widget.id)
  const autofirePath = paths.autofireMobilizationWidget(mobilization.id, widget.id)
  const donationFinishPath = paths.donationFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure o bloco de doação'>
      <Tabs>
        <Tab
          text='Ajustes'
          path={donationPath}
          isActive={donationPath === location.pathname}
        />
        <Tab
          text='Mensagem agradecimento'
          path={autofirePath}
          isActive={autofirePath === location.pathname}
        />
        <Tab
          text='Pós-doação'
          path={donationFinishPath}
          isActive={donationFinishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default SettingsMenu
