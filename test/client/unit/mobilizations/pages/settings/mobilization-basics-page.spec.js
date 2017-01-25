import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationBasicsPage } from '~mobilizations/pages/settings'

describe('client/mobilizations/pages/settings/mobilization-basics-page', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationBasicsPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
