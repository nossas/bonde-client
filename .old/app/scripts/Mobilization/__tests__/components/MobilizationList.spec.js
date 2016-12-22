import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationList from '../../components/MobilizationList'

describe('app/scripts/Mobilization/components/MobilizationList', () => {
  let wrapper

  before(() => {
    wrapper = shallow(
      <MobilizationList>
        <h1>Foo Bar</h1>
      </MobilizationList>
    )
  })

  describe('#render', () => {
    it('should render one div.mobilization-list', () => {
      expect(wrapper.find('div.mobilization-list')).to.have.length(1)
    })
    it('should render one <h1> children element as passed', () => {
      expect(wrapper.find('div.mobilization-list h1')).to.have.length(1)
    })
    it('should render one <h1> children element with its content properly', () => {
      expect(wrapper.find('div.mobilization-list h1').text()).to.be.equal('Foo Bar')
    })
  })
})
