import test from 'ava'
import React from 'react'
import { mount, shallow } from 'enzyme'
import InputHint from './InputHint'

test('render the children as a text properly', t => {
  const children = 'Info/Hint'
  const node = mount(<InputHint>{children}</InputHint>)
  t.is(node.text(), children)
})

test('render the text with its default color', t => {
  const node = shallow(<InputHint>Info/Hint</InputHint>)
  t.is(node.props().color, '#AAAAAA')
})

test('render the text with error color when `invalid` prop was passed', t => {
  const node = shallow(<InputHint invalid>Info/Hint</InputHint>)
  t.is(node.props().color, '#FF2B4E')
})
