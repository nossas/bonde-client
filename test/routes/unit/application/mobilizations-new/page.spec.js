import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import MobilizationsNewPage from '~routes/application/mobilizations-new/page'

describe('routes/application/mobilizations-new/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 }
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationsNewPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
