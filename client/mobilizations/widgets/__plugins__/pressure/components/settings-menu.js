import PropTypes from 'prop-types'
import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'
import { SettingsPageMenuLayout } from '~components/layout'

const SettingsMenu = ({ location, mobilization, widget }) => {
  const pressurePath = paths.pressure(mobilization.id, widget.id)
  const pressureEmailPath = paths.pressureEmail(mobilization.id, widget.id)
  const pressureAutofirePath = paths.pressureAutofire(mobilization.id, widget.id)
  const pressureFinishPath = paths.pressureFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure seu formulário de pressão'>
      <Tabs>
        <Tab
          path={pressurePath}
          text='Formulário'
          isActive={pressurePath === location.pathname}
        />
        <Tab
          path={pressureEmailPath}
          text='E-mail para alvo'
          isActive={pressureEmailPath === location.pathname}
        />
        <Tab
          path={pressureAutofirePath}
          text='Mensagem de agradecimento'
          isActive={pressureAutofirePath === location.pathname}
        />
        <Tab
          path={pressureFinishPath}
          text='Pós-pressão'
          isActive={pressureFinishPath === location.pathname}
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
