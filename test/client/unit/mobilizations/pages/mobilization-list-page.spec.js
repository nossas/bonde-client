import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationListPage } from '~mobilizations/pages/mobilization-list-page'

describe('client/mobilizations/pages/mobilization-list-page', () => {
  let wrapper
  const props = {
    mobilizations: [{ id: 1 }, { id: 2 }],
    toggleMenu: () => {},
    select: () => {},
    menuActiveIndex: 1,
    location: {}
  }
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<MobilizationListPage {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
