import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Section from './Section'

test.beforeEach(t => {
  t.context.node = shallow(<Section />)
})

test('should mount id of section with function uuid', t => {
  const { node } = t.context
  const section = { id: 1, name: 'About' }
  node.setProps({ uuid: (s) => `section-${s.id}`, section })

  t.is(node.find(`#section-${section.id}`).length, 1)
})
