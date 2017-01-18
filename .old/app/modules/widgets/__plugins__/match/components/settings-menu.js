import React from 'react'

import * as Paths from '../../../../../scripts/Paths'
import { Tabs, Tab } from '../../../../../components/Navigation'
import { SettingsPageMenuLayout } from '../../../../../components/Layout'

const SettingsMenu = ({ mobilization, widget, location }) => {
  const choicesPath = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
  const goalsPath = Paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)
  const finishPath = Paths.matchWidgetFinish(mobilization.id, widget.id)

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
