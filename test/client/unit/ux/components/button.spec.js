import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Button from '~client/ux/components/button'

describe('ux/components/button', () => {
  let button

  beforeEach(() => {
    button = mount(<Button />)
  })

  it('should render a button style by default', () => {
    expect(button.find('button').props().className).to.contains('btn')
  })

  it('should render with type button by default', () => {
    expect(button.find('button').props().type).to.equal('button')
  })

  it('should render children', () => {
    const button = mount(<Button><i className='icon ic-ok' /> Done!</Button>)
    expect(button.find('i.icon.ic-ok').length).to.equal(1)
    expect(button.text()).to.equal(' Done!')
  })

  it('should disable button and add disabled style', () => {
    button.setProps({ disabled: true })
    expect(button.find('button').props().disabled).to.equal(true)
    expect(button.find('button').props().className).to.contains('disabled')
  })

  it('should call onClick when click on button', () => {
    let called = false
    button.setProps({ onClick: () => called = true })
    button.find('button').simulate('click')
    expect(called).to.equal(true)
  })

  it('should call onClick only when type not equals submit', () => {
    let called = false
    button.setProps({ type: 'submit', onClick: () => called = true })
    button.find('button').simulate('click')
    expect(called).to.equal(false)
  })

  describe('when props "to" is passed', () => {
    beforeEach(() => {
      button.setProps({ to: '/' })
    })

    it('should render Link component', () => {
      expect(button.find('Link').length).to.equal(1)
    })

    it('should render with type button by default', () => {
      expect(button.find('Link').props().className).to.contains('btn')
    })

    it('should render children', () => {
      const button = mount(<Button to='/'><i className='icon ic-ok' /> Done!</Button>)
      expect(button.find('Link').find('i.icon.ic-ok').length).to.equal(1)
      expect(button.find('Link').text()).to.equal(' Done!')
    })
  })
})
