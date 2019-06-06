import React from 'react'
import { shallow } from 'enzyme'
import { Mutation } from 'react-apollo'
import Form from './Form'
import FormGraphQL from './FormGraphQL'
import { expect } from 'chai'

describe('components > Form > FormGraphQL', () => {
  const mutation = {}
  let node

  beforeEach(() => {
    node = shallow(<FormGraphQL mutation={mutation} />)
  })

  it('render Mutation with mutation passed by props', () => {
    expect(node.find(Mutation).length).to.be.equal(1)
    expect(node.find(Mutation).props().mutation).to.be.equal(mutation)
  })

  it('render Form inside Mutation', () => {
    const { children: Children } = node.find(Mutation).props()
    const children = shallow(<Children />)
    expect(children.find(Form).length).to.be.equal(1)
  })

  it('called onSubmit with values and mutation when submit form', () => {
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

    expect(expected.values).to.be.equal(values)
    expect(typeof expected.mutation).to.be.equal(typeof mutation)
  })

  it('render children inside form', () => {
    const children = <div id='formField' />
    node.setProps({ children })

    const { children: Children } = node.find(Mutation).props()
    const form = shallow(<Children />).find(Form)

    expect(form.props().children).to.be.equal(children)
  })
})
