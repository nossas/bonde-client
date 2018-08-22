import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import NavToggle, { NavItemGroup } from './NavToggle'
import NavButton from './NavButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

test.beforeEach(t => {
  t.context.node = shallow(<NavToggle />)
})

test('should render NavButton with fontawesomeicon bars', t => {
  const { node } = t.context
  const navButton = node.find(NavButton)
  
  t.is(navButton.length, 1)
  t.is(navButton.find(FontAwesomeIcon).props().icon, 'bars')
})

test('should render children in NavItemGroup when click NavButton', t => {
  const { node } = t.context
  
  node.find(NavButton).simulate('click')
  t.is(node.find(NavItemGroup).length, 1)
})
