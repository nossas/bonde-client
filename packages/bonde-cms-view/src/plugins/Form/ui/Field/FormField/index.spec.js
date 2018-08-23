import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import ControlLabel from './ControlLabel'
import FieldError from './FieldError'
import FormField from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    children: <p>Children</p>
  }
  t.context.node = shallow(<FormField {...t.context.defaultProps} />)
})

test('should render children inside FormField', t => {
  const { node } = t.context
  t.is(node.find('p').length, 1)
})

test('should render label when receive by props', t => {
  const { node } = t.context
  const props = { label: 'Label' }
  node.setProps(props)

  const controlLabel = node.find(ControlLabel)
  t.is(controlLabel.length, 1)
  t.is(controlLabel.props().children, props.label)
})

test('should render error when receive by props', t => {
  const { node } = t.context
  const props = { error: 'Has error' }
  node.setProps(props)

  const fieldError = node.find(FieldError)
  t.is(fieldError.length, 1)
  t.is(fieldError.props().children, props.error)
})
