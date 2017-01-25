import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateChooseCustomPage } from '~mobilizations/templates/pages/template-choose-custom-page'

describe('client/mobilizations/templates/pages/template-choose-custom-page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateChooseCustomPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
