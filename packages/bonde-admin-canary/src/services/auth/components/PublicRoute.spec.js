import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import PublicRoute from './PublicRoute'

const props = {
  component: () => (<p id='testComponent'>Test Render</p>)
}

test('render component if authenticated is false', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <PublicRoute {...props} authenticated={false} />
    </StaticRouter>
  )

  t.is(node.find('#testComponent').length, 1)
  t.is(context.action, undefined)
  t.is(context.url, undefined)
})

test('render component if authenticated is true and not pass redirectTo', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <PublicRoute {...props} authenticated={true} />
    </StaticRouter>
  )

  t.is(node.find('#testComponent').length, 1)
  t.is(context.action, undefined)
  t.is(context.url, undefined)
})

test('render component if authenticated is true and pass redirectTo', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <PublicRoute {...props} authenticated={true} redirectTo='/home' />
    </StaticRouter>
  )

  t.is(node.find('Redirect').length, 1)
  t.is(context.action, 'REPLACE')
  t.is(context.url, '/home')
})
