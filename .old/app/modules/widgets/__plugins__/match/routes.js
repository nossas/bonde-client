import React from 'react'
import { Route } from 'react-router'

// Current module dependencies
import { ChoicesPage, GoalsPage, SettingsFinishMessagePage } from './pages'

const namespace = '/matches'

export default () => [
  <Route path={`${namespace}/choices`} key='match-choices' component={ChoicesPage} />,
  <Route path={`${namespace}/goals`} key='match-goals' component={GoalsPage} />,
  <Route path={`${namespace}/finish`} key='match-finish' component={SettingsFinishMessagePage} />
]
