import React from 'react'
import { Route } from 'react-router'

import Application from '~client/application'
import * as paths from '~client/paths'
import { NotFound } from '~components/error'

import { createRoutes as accountCreateRoutes, requireLoginWrapper } from '~account'
import { createRoutes as communityCreateRoutes } from '~community'
import { createRoutes as mobilizationCreateRoutes } from '~mobilizations'

import { CustomDomainPage } from '~mobilizations/pages'
import matchRoutesExternal from '~mobilizations/widgets/__plugins__/match/routes-external'

export default function (store, host) {
  const isAppSubdomain = (host === `app.${process.env.APP_DOMAIN}`)

  if (isAppSubdomain) {
    const requiredLogin = requireLoginWrapper(store, paths.login())

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
