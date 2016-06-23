import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { render, mount, shallow } from 'enzyme'

import MobilizationSettings from './MobilizationSettings'


describe('MobilizationSettings', () => {
  let props = {
    mobilization: {},
    location: {},
    children: <div>Test</div>
  }

  it('should render ConfigurationsMenu', () => {
    let wrapper = shallow(<MobilizationSettings {...props} />)
    expect(wrapper.find('ConfigurationsMenu').length).to.equal(1)
  })
})
