import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/authenticated/admin/mobilizations-new/page'

describe('routes/application/mobilizations-new/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 }
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
