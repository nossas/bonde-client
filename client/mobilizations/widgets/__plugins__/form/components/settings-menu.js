import React, { PropTypes } from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'
import { SettingsPageMenuLayout } from '~components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const fieldsPath = paths.fieldsMobilizationWidget(mobilization.id, widget.id)
  const formPath = paths.formMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = paths.autofireMobilizationWidget(mobilization.id, widget.id)
  const exportPath = paths.exportWidgetData(mobilization.id, widget.id)
  const finishPath = paths.widgetFormSettingsFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure o formulário da sua ação'>
      <Tabs>
        <Tab
          path={fieldsPath}
          text='Campos do formulário'
          isActive={fieldsPath === location.pathname}
        />
        <Tab
          path={formPath}
          text='Ajustes'
          isActive={formPath === location.pathname}
        />
        <Tab
          path={autofirePath}
          text='Mensagem agradecimento'
          isActive={autofirePath === location.pathname}
        />
        <Tab
          path={exportPath}
          text='Relatório'
          isActive={exportPath === location.pathname}
        />
        <Tab
          path={finishPath}
          text='Pós-inscrição'
          isActive={finishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default SettingsMenu
