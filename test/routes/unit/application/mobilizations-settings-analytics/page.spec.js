import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import MobilizationsSettingsAnalyticsPage from '~routes/application/mobilizations-settings-analytics/page'

describe('routes/application/mobilizations-settings-analytics/page', () => {
  let wrapper
  const props = {
    fields: {
      google_analytics_code: 'UA-12345678'
    }
  }
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<MobilizationsSettingsAnalyticsPage {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
