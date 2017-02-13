import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplatesListPage from '~routes/application/templates-list/page'

describe('routes/application/templates-list/page', () => {
  let wrapper
  const props = {
    toggleMenu: () => {},
    menuActiveIndex: 0,
    mobilizationTemplates: [{ id: 1 }, { id: 2 }],
    asyncDestroyTemplate: () => {},
    location: {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplatesListPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
