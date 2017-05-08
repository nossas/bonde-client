import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/admin/authenticated/sidebar/templates-choose-custom/page'

describe('routes/admin/authenticated/sidebar/templates-choose-custom/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
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
