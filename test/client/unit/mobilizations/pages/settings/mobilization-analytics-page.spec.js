import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationAnalyticsPage } from '~mobilizations/pages/settings/mobilization-analytics-page'

describe('client/mobilizations/pages/settings/mobilization-analytics-page', () => {
  let wrapper
  const props = {
    fields: {
      google_analytics_code: 'UA-12345678'
    }
  }
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<MobilizationAnalyticsPage {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
