import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { Mutation } from 'react-apollo'
import { Title } from 'bonde-styleguide'
import Form from './Form'
import FormGraphQL from './FormGraphQL'

const mutation = {}

test.beforeEach(t => {
  t.context.node = shallow(<FormGraphQL mutation={mutation} />)
})

test('render Mutation with mutation passed by props', t => {
  const { node } = t.context

  t.is(node.find(Mutation).length, 1)
  t.is(node.find(Mutation).props().mutation, mutation)
})

test('render Form inside Mutation', t => {
  const { node } = t.context

  const { children: Children } = node.find(Mutation).props()
  const children = shallow(<Children />)
  t.is(children.find(Form).length, 1)
})

test('called onSubmit with values and mutation when submit form', t => {
  const { node } = t.context
  
  const expected = {}
  const onSubmit = (values, mutation) => {
    expected.values = values
    expected.mutation = mutation
    return Promise.resolve()
  }
  node.setProps({ onSubmit })
  
  const { children: Children } = node.find(Mutation).props()
  const form = shallow(<Children />).find(Form)
  
  const values = { name: 'test name' }
  form.props().onSubmit(values)
  
  t.is(expected.values, values)
  t.is(typeof expected.mutation, typeof mutation)
})

test('render children inside form', t => {
  const { node } = t.context
  const children = <div id='formField' />
  node.setProps({ children })
  
  const { children: Children } = node.find(Mutation).props()
  const form = shallow(<Children />).find(Form)
  
  t.is(form.props().children, children)
})
