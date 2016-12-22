import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { Choices } from '../../components'

describe('Match/components/Choices', () => {
  let wrapper
  let sandbox
  const props = {
    title: 'Foo Bar Title!',
    disabled: false,
    options: ['Framboesa', 'Auxílio Terno'],
    onChange: sinon.spy()
  }

  before(() => {
    sandbox = sinon.sandbox.create()
    wrapper = mount(<Choices { ...props } />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should render one <select>.choices', () => {
    const children = wrapper.find('select.choices')
    expect(children.length).to.equal(1)
  })

  it('should render two <option>', () => {
    const children = wrapper.find('select.choices option')
    expect(children.length).to.equal(3)
  })

  it('should render items passed as options props', () => {
    const children = wrapper.find('select.choices option')

    expect(children.at(0).text()).to.equal('Selecione...')
    expect(children.at(1).text()).to.equal('Framboesa')
    expect(children.at(2).text()).to.equal('Auxílio Terno')
  })

  it('should render one <label>', () => {
    expect(wrapper.find('label')).to.have.length(1)
  })

  it('should render <label> with passed title prop', () => {
    expect(wrapper.find('label').text()).to.have.string(props.title)
  })

  it('should disable <select> when passing disabled prop as true', () => {
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('select').props().disabled).to.be.true
  })

  it('onChange prop should be a function', () => {
    expect(wrapper.find('select').props().onChange).to.be.function
  })

  it('should call onChange when simulates change', () => {
    const target = { value: props.options[1] }
    wrapper.find('select').simulate('change', { target })
    expect(props.onChange).have.been.called
  })

  it('selected option should be as expected', () => {
    let selectedChoice
    wrapper.setProps({
      onChange: (selected) => selectedChoice = selected.target.value,
    })
    const target = { value: props.options[1] }
    wrapper.find('select').simulate('change', { target })

    expect(selectedChoice).to.equal(props.options[1])
  })
})
