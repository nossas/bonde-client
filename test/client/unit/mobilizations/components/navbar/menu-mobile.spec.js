import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { MenuMobile } from '~mobilizations/components/navbar'

describe('client/mobilizations/components/navbar/menu-mobile', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MenuMobile {...props} />)
  })

  it('should render without crash', () => {
    expect(wrapper).to.be.ok
  })

  it('should render <MenuItems /> component properly', () => {
    expect(wrapper.find('MenuItems')).to.have.length(1)
  })
})
