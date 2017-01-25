import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationEditContainer } from '~mobilizations/containers/mobilization-edit-container'

describe('client/mobilizations/containers/mobilization-edit-container', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationEditContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
