import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateChooseGlobalPage } from '~mobilizations/templates/pages/template-choose-global-page'

describe('client/mobilizations/templates/pages/template-choose-global-page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateChooseGlobalPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
