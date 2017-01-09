import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { PressureCount } from '../../components'

describe('<PressureCount />', () => {
  let componet

  beforeEach(() => {
    componet = mount(<PressureCount />)
  })

  it('should render ok and total 0 by default', () => {
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.text()).to.equal('0')
  })

  it('should paint number with color', () => {
    componet.setProps({ color: '#444' })
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.props().style.color).to.equal('#444')
  })

  it('should render total according value passed', () => {
    componet.setProps({ value: 420 })
    const totalSpan = componet.find('span').at(0)
    expect(totalSpan.text()).to.equal('420')
  })

  it('should render text default pressões feitas', () => {
    componet.setProps({ text: undefined })
    expect(componet.find('span.bold').text()).to.equal('pressões feitas')
  })

  it('should render text passed', () => {
    componet.setProps({ text: 'pressões' })
    expect(componet.find('span.bold').text()).to.equal('pressões')
  })
})
