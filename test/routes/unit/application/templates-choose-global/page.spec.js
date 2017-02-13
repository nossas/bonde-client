import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplatesChooseGlobalPage from '~routes/application/templates-choose-global/page'

describe('routes/application/templates-choose-global/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplatesChooseGlobalPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
