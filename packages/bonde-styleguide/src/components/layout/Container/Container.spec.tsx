import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Container from './Container'

test('renders ok', t => {
  const node = shallow(<Container />)
  t.is(node.find('Container').length, 1)
})
