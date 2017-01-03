import React, { PropTypes } from 'react'

import * as Paths from '../../../../../Paths'
import { Tabs, Tab } from '../../../../../../components/Navigation'
import { SettingsPageMenuLayout } from '../../../../../../components/Layout'

const Menu = ({ mobilization, widget, location }) => {
  const donationPath = Paths.donationMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)

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
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

Menu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default Menu
