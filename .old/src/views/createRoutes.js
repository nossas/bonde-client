import React from 'react'
import { Route } from 'react-router'

import {
  Application,
  NotFound
} from '../../app/scripts/containers'

import { CustomDomainPage } from '../../app/modules/mobilizations/pages'

import * as Paths from '../../app/scripts/Paths'

import matchRoutesExternal from '../../app/modules/widgets/__plugins__/match/routes-external'
import { createRoutes as accountCreateRoutes, requireLoginWrapper } from '../../app/scripts/Account'
import { createRoutes as communityCreateRoutes } from '../../app/scripts/Community'
import { createRoutes as mobilizationCreateRoutes } from '../../app/scripts/Mobilization'

export default function (store, host) {
  const isAppSubdomain = (host === `app.${process.env.APP_DOMAIN}`)

  if (isAppSubdomain) {
    const requiredLogin = requireLoginWrapper(store, Paths.login())

    return (
      <Route component={Application}>
        {accountCreateRoutes(requiredLogin, '/community')}
        {mobilizationCreateRoutes(requiredLogin)}
        {communityCreateRoutes(requiredLogin)}
        <Route path='*' component={NotFound} status={404} />
      </Route>
    )
  }

  return (
    <Route component={Application}>
      <Route path='/' component={CustomDomainPage} />
      {matchRoutesExternal({ prefix: '/widgets/:widget_id' })}
      <Route path='*' component={NotFound} status={404} />
    </Route>
  )
}
