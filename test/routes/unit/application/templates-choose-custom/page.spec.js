import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplatesChooseCustomPage from '~routes/application/templates-choose-custom/page'

describe('routes/application/templates-choose-custom/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplatesChooseCustomPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
