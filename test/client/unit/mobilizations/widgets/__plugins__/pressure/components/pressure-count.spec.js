import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

// Current module dependencies
import { PressureCount } from '~widget-plugins/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-count', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<PressureCount />)
  })

  it('should render ok and total 0 by default', () => {
    const totalSpan = wrapper.find('span').at(0)
    expect(totalSpan.text()).to.equal('0')
  })

  it('should paint number with color', () => {
    wrapper.setProps({ color: '#444' })
    const totalSpan = wrapper.find('span').at(0)
    expect(totalSpan.props().style.color).to.equal('#444')
  })

  it('should render total according value passed', () => {
    wrapper.setProps({ value: 420 })
    const totalSpan = wrapper.find('span').at(0)
    expect(totalSpan.text()).to.equal('420')
  })

  it('should render text default pressões feitas', () => {
    wrapper.setProps({ text: undefined })
    expect(wrapper.find('span.bold').text()).to.equal('pressões feitas')
  })

  it('should render text passed', () => {
    wrapper.setProps({ text: 'pressões' })
    expect(wrapper.find('span.bold').text()).to.equal('pressões')
  })
})
