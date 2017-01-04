import React from 'react'
import { Route } from 'react-router'

import { ChoicesPage, GoalsPage } from './pages'


export default () => [
  <Route path="/matches/choices" component={ChoicesPage} />,
  <Route path="/matches/goals" component={GoalsPage} />
]
