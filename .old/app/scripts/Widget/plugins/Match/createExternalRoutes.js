import React from 'react'
import { Route } from 'react-router'

import { ShareContainer } from './containers'


export default ({ prefix }) => (
  <Route
    path={prefix ? `${prefix}/matches/:match_id/share` : "/matches/:match_id/share"}
    component={ShareContainer}
  />
)
