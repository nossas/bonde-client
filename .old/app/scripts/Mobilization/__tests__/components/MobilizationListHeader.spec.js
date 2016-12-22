import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import MobilizationsHeader from '../../components/MobilizationsHeader'

describe('app/scripts/Mobilization/components/MobilizationsHeader', () => {
  const context = { router: {} }
  let wrapper
  const props = {
    location: { pathname: '' },
    mobilization: { id: 1 }
  }

  beforeEach(() => {
    wrapper = shallow(<MobilizationsHeader {...props} />, { context })
  })

  describe('#render', () => {
    it('should render add new mobilization button', () => {
      expect(wrapper.find('Link').length).to.equal(1)
    })

    describe('tabs', () => {
      it('should render one <Tabs> parent component', () => {
        expect(wrapper.find('Tabs')).to.have.length(1)
      })
      it('should render 2 <Tab> children component', () => {
        expect(wrapper.find('Tab')).to.have.length(2)
      })
    })
  })
})
