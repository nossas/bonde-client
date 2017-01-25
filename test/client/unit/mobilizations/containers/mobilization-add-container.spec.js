import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationAddContainer } from '~mobilizations/containers'

describe('client/mobilizations/containers/mobilization-add-container', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationAddContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
