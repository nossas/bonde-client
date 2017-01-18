import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Menu from './menu'

describe('app/modules/mobilizations/components/navbar/menu', () => {
  let wrapper
  const props = {
    blocks: [
      {
        id: 1,
        hidden: false,
        menu_hidden: false
      }
    ]
  }

  beforeEach(() => {
    wrapper = mount(<Menu {...props} />)
  })

  it('renders without crashed', () => {
    expect(wrapper).to.be.ok
  })

  it('should render DropDownMenu if mobile version is true', () => {
    wrapper.setProps({ mobile: true })
    expect(wrapper.find('DropDownMenu').length).to.equal(1)
  })

  it('should render div.bg-darken-4 if mobile version is false', () => {
    wrapper.setProps({ mobile: true })
    expect(wrapper.find('div.bg-darken-4').length).to.equal(1)
  })

  it('should render blocks passed by props', () => {
    expect(wrapper.find('NavbarEditionWrapper').length).to.equal(1)
  })

  it('should render inline-block if isnt mobile version', () => {
    wrapper.setProps({ mobile: false })
    expect(wrapper.find('.inline-block').length).to.equal(1)
  })

  it('should render block if mobile version', () => {
    wrapper.setProps({ mobile: true })
    expect(wrapper.find('.inline-block').length).to.equal(0)
  })
})
