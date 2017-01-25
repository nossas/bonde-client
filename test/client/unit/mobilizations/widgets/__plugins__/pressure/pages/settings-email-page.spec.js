import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { SettingsEmailPage } from '~widget-plugins/pressure/pages/settings-email-page'

describe('client/mobilizations/widgets/__plugins__/pressure/pages/settings-email-page', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {},
    handleSubmit: mock.noop,
    submitting: false
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsEmailPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
