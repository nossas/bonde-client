import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationListItem } from './'

describe('app/scripts/Mobilization/components/MobilizationListItem', () => {
  let wrapper
  const context = { router: {} }

  before(() => {
    wrapper = shallow(
      <MobilizationListItem>
        <span>Foo Bar</span>
      </MobilizationListItem>,
      { context }
    )
  })

  describe('#render', () => {
    it('should render one <span> children element', () => {
      expect(wrapper.find('span')).to.have.length(1)
    })
    it('should render one <span> children element with its content properly', () => {
      expect(wrapper.find('span').text()).to.be.equal('Foo Bar')
    })
  })
})
