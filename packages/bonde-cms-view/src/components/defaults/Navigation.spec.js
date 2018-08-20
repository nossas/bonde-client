import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Navigation from './Navigation'

test.beforeEach(t => {
  t.context.node = shallow(<Navigation />)
})

test('should render an anchor link for each section', t => {
  const { node } = t.context
  const sections = [{ id: 1, name: 'About' }]
  const uuid = s => `section-${s.id}`
  node.setProps({ sections, uuid })
  
  t.is(node.find('a').props().href, `#section-${sections[0].id}`)
})
