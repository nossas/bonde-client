import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

test('render a button component', t => { 
  const node = shallow(<Button>Click me!</Button>)
  t.is(node.find('button').length, 1)
})

test('called onClick props when clicked on button', t => {
  let clicked = false
  const onClick = () => { clicked = true }
  const node = shallow(<Button onClick={onClick}>Click me!</Button>)
  node.find('button').simulate('click')
  t.is(clicked, true)
})

