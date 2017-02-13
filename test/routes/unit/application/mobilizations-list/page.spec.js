import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import MobilizationsListPage from '~routes/application/mobilizations-list/page'

describe('routes/application/mobilization-list/page', () => {
  let wrapper
  const props = {
    mobilizations: [{ id: 1 }, { id: 2 }],
    toggleMenu: () => {},
    select: mock.noop,
    menuActiveIndex: 1,
    location: {},
    dispatch: mock.noop
  }
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<MobilizationsListPage {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
