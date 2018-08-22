import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './Navigation'

test.beforeEach(t => {
  t.context.defaultProps = {
    sections: [{ id: 1, name: 'About' }],
    uuid: s => `section-${s.id}`,
    renderNavigationItem: ({ section, href }) => (
      <a href={href}>{section.name}</a>
    )
  }
  t.context.node = shallow(<Navigation {...t.context.defaultProps} />)
})

test('should render an anchor link for each section', t => {
  const { node, defaultProps } = t.context
  const href = `#${defaultProps.uuid(defaultProps.sections[0])}`
  t.is(node.find('a').props().href, href)
})

test('should custom navigation item render', t => {
  const { node, defaultProps } = t.context

  const index = 0
  const navigationProps = node.find('a').at(index).props()
  const section = defaultProps.sections[index]
  
  t.is(navigationProps.children, section.name)
})

test('should custom navigation wrapper render', t => {
  const { node } = t.context
  const Navigation = ({ children }) => (
    <div />
  )
  node.setProps({ renderNavigation: Navigation })

  t.is(node.find('a').length, 0)
})
