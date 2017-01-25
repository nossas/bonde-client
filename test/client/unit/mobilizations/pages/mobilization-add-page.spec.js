import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationAddPage } from '~mobilizations/pages/mobilization-add-page'

describe('client/mobilizations/pages/mobilization-add-page', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationAddPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
