import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import MobilizationsSettingsBasicsPage from '~routes/application/mobilizations-settings-basics/page'

describe('routes/application/mobilizations-settings-basics/page', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationsSettingsBasicsPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
