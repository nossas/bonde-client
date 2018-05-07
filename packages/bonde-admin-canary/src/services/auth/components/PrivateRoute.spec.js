import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const props = {
  component: () => (<p id='testComponent'>Test Render</p>),
  redirectTo: '/login'
}

test('render component if authenticated', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <PrivateRoute {...props} authenticated={true} />
    </StaticRouter>
  )

  t.is(node.find('#testComponent').length, 1)
  t.is(context.action, undefined)
  t.is(context.url, undefined)
})

test('render redirect if not authenticated', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <PrivateRoute {...props} />
    </StaticRouter>
  )

  t.is(node.find('Redirect').length, 1)
  t.is(context.action, 'REPLACE')
  t.is(context.url, props.redirectTo)
})
