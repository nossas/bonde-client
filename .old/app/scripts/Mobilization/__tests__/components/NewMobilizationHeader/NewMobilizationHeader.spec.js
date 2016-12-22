import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import * as Paths from '../../../../Paths'
import { NewMobilizationHeader } from '../../../components'

describe('<NewMobilizationHeader />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NewMobilizationHeader />)
  })

  describe('#render', () => {
    it('should render root div.new-mobilization-header', () => {
      expect(wrapper.find('div.new-mobilization-header')).to.have.length(1)
    })
    it('should render one h1 element', () => {
      expect(wrapper.find('h1')).to.have.length(1)
    })
    it('should render h1 element with its value properly', () => {
      expect(wrapper.find('h1').text()).to.be.equal('Nova mobilização')
    })
    it('should render one NewMobilizationHeaderSteps component', () => {
      expect(wrapper.find('NewMobilizationHeaderSteps')).to.have.length(1)
    })
  })
})
