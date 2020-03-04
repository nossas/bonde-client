import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Backdrop from './Backdrop'

test('render a div element tag', t => {
  const node = shallow(<Backdrop />)
  t.is(node.find('div').length, 1)
})

test('render with color prop as none by default', t => {
  const node = shallow(<Backdrop />)
  t.is(node.instance().props.color, 'inherit')
})

test('render with zIndex prop as 10 by default', t => {
  const node = shallow(<Backdrop />)
  t.is(node.instance().props.zIndex, 10)
})
