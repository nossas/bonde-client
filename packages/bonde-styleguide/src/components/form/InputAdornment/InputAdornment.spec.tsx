import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import InputAdornment from './InputAdornment'

test('render exclamation icon when `invalid` is true', t => {
  const node = mount(<InputAdornment invalid />)
  t.is(node.find('Icon').get(0).props.name, 'exclamation')
})

test('render tick icon when `valid` is true', t => {
  const node = mount(<InputAdornment valid />)
  t.is(node.find('Icon').get(0).props.name, 'tick')
})
