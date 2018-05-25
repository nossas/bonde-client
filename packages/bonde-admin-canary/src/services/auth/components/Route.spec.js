import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import { StaticRouter } from 'react-router-dom'
import Route from './Route'

const props = {
  component: () => (<p id='testComponent'>Test Render</p>),
  redirectTo: '/login'
}

test('render component when assert is true', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <Route {...props} assert={true} />
    </StaticRouter>
  )

  t.is(node.find('#testComponent').length, 1)
  t.is(context.action, undefined)
  t.is(context.url, undefined)
})

test('render redirect when assert if false', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <Route {...props} assert={false} />
    </StaticRouter>
  )

  t.is(context.action, 'REPLACE')
  t.is(context.url, props.redirectTo)
})

test('render component when assert false and redirectTo undefined', t => {
  const context = {}
  const node = mount(
    <StaticRouter context={context}>
      <Route {...props} assert={false} redirectTo={undefined} />
    </StaticRouter>
  )

  t.is(node.find('#testComponent').length, 1)
  t.is(context.action, undefined)
  t.is(context.url, undefined)
})
