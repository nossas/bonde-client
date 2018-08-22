import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import NavItem, { NavItemStyled } from './NavItem'

test.beforeEach(t => {
  t.context.defaultProps = {
    section: { name: 'About' },
    href: '#about'
  }
  t.context.node = shallow(<NavItem {...t.context.defaultProps}/>)
})

test('should pass href to NavItemStyled', t => {
  const { node, defaultProps } = t.context
  const navItemStyled = node.find(NavItemStyled)

  t.is(navItemStyled.props().href, defaultProps.href)
})

test('should render name of section', t => {
  const { node, defaultProps } = t.context
  const navItemStyled = node.find(NavItemStyled)

  t.is(navItemStyled.props().children, defaultProps.section.name)
})
