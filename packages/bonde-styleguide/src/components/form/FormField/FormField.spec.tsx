import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import FormField from './FormField'

const InputRender = (props) => (<input />)
const defaultProps = {
  inputComponent: InputRender,
  onChange: () => {}
}

test.beforeEach(t => {
  t.context.node = shallow(<FormField label='Default' {...defaultProps} />)
})

test('render ControlLabel component', t => {
  const { node } = t.context
  t.is(node.find('ControlLabel').length, 1)
})

test('render ControlLabel with exact text passed by label prop', t => {
  const label = 'Default'
  const { node } = t.context
  node.setProps({ label })
  t.is(node.find('ControlLabel').children().text(), label)
})

test('not render InputHint by default', t => {
  const { node } = t.context
  t.is(node.find('InputHint').length, 0)
})

test('render InputHint when pass `hint` prop', t => {
  const { node } = t.context
  node.setProps({ hint: 'Info/Hint' })
  t.is(node.find('InputHint').length, 1)
})

test('not render InputHint when pass touched false to prop', t => {
  const { node } = t.context
  node.setProps({ meta: { error: 'Validation Error', touched: false } })
  t.is(node.find('InputHint').length, 0)
})

test('render InputHint when pass error and touched prop', t => {
  const { node } = t.context
  node.setProps({ meta: { error: 'Validation Error', touched: true } })
  t.is(node.find('InputHint').length, 1)
})

test('render InputHint with `error` text when pass bot `error` and `hint` prop', t => {
  const { node } = t.context
  const error = 'Validation Error'
  node.setProps({ hint: 'Info/Hint', meta: { error, touched: true } })
  t.is(node.find('InputHint').children().text(), error)
})

test('render InputHint with `hint` text when pass `hint` prop', t => {
  const { node } = t.context
  const hint = 'Info/Hint'
  node.setProps({ label: 'Default', hint })
  t.is(node.find('InputHint').children().text(), hint)
})

test('render Input component properly', t => {
  const { node } = t.context
  t.is(node.find('InputRender').length, 1)
})

test('not render InputAdornment by default', t => {
  const { node } = t.context
  t.is(node.find('InputAdornment').length, 0)
})

test('not render InputAdornment when pass touched false to props', t => {
  const { node } = t.context
  node.setProps({ meta: { valid: true, touched: false } })
  t.is(node.find('InputAdornment').length, 0)
})

test('render InputAdornment when valid and touched prop was passed', t => {
  const { node } = t.context
  node.setProps({ meta: { valid: true, touched: true } })
  t.is(node.find('InputAdornment').length, 1)
})

test('render InputAdornment when error and touched prop was passed', t => {
  const { node } = t.context
  node.setProps({ meta: { error: 'Validatio Error', touched: true } })
  t.is(node.find('InputAdornment').length, 1)
})
