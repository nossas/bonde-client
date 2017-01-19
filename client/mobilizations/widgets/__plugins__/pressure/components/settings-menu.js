import React, { PropTypes } from 'react'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { Tabs, Tab } from '../../../../../components/Navigation'
import { SettingsPageMenuLayout } from '../../../../../components/Layout'

const SettingsMenu = ({ location, mobilization, widget }) => {
  const formPath = Paths.formPressureWidget(mobilization.id, widget.id)
  const emailPath = Paths.emailPressureWidget(mobilization.id, widget.id)
  const finishPath = Paths.finishPressureWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure seu formulário de pressão'>
      <Tabs>
        <Tab
          path={formPath}
          text='Formulário'
          isActive={formPath === location.pathname}
        />
        <Tab
          path={emailPath}
          text='E-mail para alvo'
          isActive={emailPath === location.pathname}
        />
        <Tab
          path={autofirePath}
          text='Mensagem de agradecimento'
          isActive={autofirePath === location.pathname}
        />
        <Tab
          path={finishPath}
          text='Pós-pressão'
          isActive={finishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  widget: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
}

export default SettingsMenu
