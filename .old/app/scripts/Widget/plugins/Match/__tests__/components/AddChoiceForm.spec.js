import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { AddChoiceForm } from '../../components/'

describe('Match/components/AddChoiceForm', () => {
  let wrapper
  let props = {
    title: undefined,
    label: undefined,
    choices: [],
    handleAddItem: (choice) => {},
    handleRemoveItem: (choice) => {},
    handleChangeLabel: (label) => {}
  }

  beforeEach(() => {
    wrapper = mount(<AddChoiceForm {...props} />)
  })

  it('should add choices state when clicked add choice', () => {
    let expected
    wrapper.setProps({
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    wrapper.setState({'value': 'teste'})
    wrapper.find('button').simulate('click')
    expect(expected).to.equal('teste')
  })

  it('should remove choices state when clicked remove choice', () => {
    let expected
    wrapper.setProps({
      choices: ['Item1', 'Item2'],
      handleRemoveItem: (choice) => {
        expected = choice
      }
    })
    const row1 = wrapper.find('.choices-block a').at(0)
    row1.simulate('click')
    expect(expected).to.equal('Item1')
  })

  it('should clear input when clicked button', () => {
    wrapper.setState({ value: 'asdas' })
    wrapper.find('button').simulate('click')
    expect(wrapper.instance().state.value).to.equal('')
  })

  it('should render disabled button add when input empty', () => {
    wrapper.setState({ value: '' })
    const button = wrapper.find('button')
    expect(button.props().disabled).to.equal(true)
  })

  it('should not add choice when choice exists in list', () => {
    let expected = undefined
    wrapper.setProps({
      choices: ['Item1'],
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    wrapper.setState({ value: 'Item1' })
    wrapper.find('button').simulate('click')
    expect(expected).to.equal(undefined)
  })

  it('should add choice when keypress [Enter]', () => {
    let expected
    wrapper.setProps({
      choices: [],
      handleAddItem: (choice) => {
        expected = choice
      }
    })
    wrapper.setState({ value: 'Item1' })
    wrapper.find('input').at(1).simulate('keypress', { key: 'Enter' })
    expect(expected).to.equal('Item1')
  })
})
