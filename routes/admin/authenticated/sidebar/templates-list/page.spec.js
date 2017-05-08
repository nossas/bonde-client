import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/admin/authenticated/sidebar/templates-list/page'

describe('routes/admin/authenticated/sidebar/templates-list/page', () => {
  let wrapper
  const props = {
    toggleMenu: () => {},
    menuActiveIndex: 0,
    mobilizationTemplates: [{ id: 1 }, { id: 2 }],
    asyncDestroyTemplate: () => {},
    location: {}
  }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
