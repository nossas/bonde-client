import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import SelectField from './SelectField'
import TextField from './TextField'
import Field from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    field: {
      kind: 'text'
    },
    onBlur: () => Promise.resolve()
  }
  t.context.node = shallow(<Field {...t.context.defaultProps} />)
})

test('should render TextField when kind is text', t => {
  const { node } = t.context
  node.setProps({ field: { kind: 'text' } })

  t.is(node.find(TextField).length, 1)
})

test('should render TextField when kind is email', t => {
  const { node } = t.context
  node.setProps({ field: { kind: 'email' } })

  t.is(node.find(TextField).length, 1)
})

test('should render SelectField when kind is drodpown', t => {
  const { node } = t.context
  node.setProps({ field: { kind: 'dropdown' } })

  t.is(node.find(SelectField).length, 1)
})
