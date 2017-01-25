import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateListPage } from '~mobilizations/templates/pages/template-list-page'

describe('client/mobilizations/templates/pages/template-list-page', () => {
  let wrapper
  const props = {
    toggleMenu: () => {},
    menuActiveIndex: 0,
    mobilizationTemplates: [{ id: 1 }, { id: 2 }],
    asyncDestroyTemplate: () => {},
    location: {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateListPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
