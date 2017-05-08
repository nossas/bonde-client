import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/mobilizations-list/page'

describe('routes/admin/authenticated/sidebar/mobilizations-list/page', () => {
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
    wrapper = shallow(<Page {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
