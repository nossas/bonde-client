import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Navbar from './'
import Nav from './Nav'
import NavToggle from './NavToggle'

test.beforeEach(t => {
  t.context.ChildComponent = () => <div />
  t.context.node = shallow(
    <Navbar>
      <t.context.ChildComponent />
    </Navbar>
  )
})

test('should pass children to Nav component', t => {
  const { node, ChildComponent } = t.context
  const nav = node.find(Nav)

  t.deepEqual(nav.props().children, <ChildComponent />)
})

test('should pass children to NavToogle component', t => {
  const { node, ChildComponent } = t.context
  const nav = node.find(NavToggle)

  t.deepEqual(nav.props().children, <ChildComponent />)
})
