import React from 'react'

// Global module dependencies
import * as paths from '~client/paths'
import { Tabs, Tab } from '~components/navigation/tabs'
import { SettingsPageMenuLayout } from '~components/layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const choicesPath = paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
  const goalsPath = paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)
  const finishPath = paths.matchWidgetFinish(mobilization.id, widget.id)

  return (
    <SettingsPageMenuLayout title='Configure as combinações da sua ação'>
      <Tabs>
        <Tab
          path={choicesPath}
          text='Opções de combinação'
          isActive={choicesPath === location.pathname}
        />
        <Tab
          path={goalsPath}
          text='Resultados das combinações'
          isActive={goalsPath === location.pathname}
        />
        <Tab
          path={finishPath}
          text='Pós-combinação'
          isActive={finishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

export default SettingsMenu
