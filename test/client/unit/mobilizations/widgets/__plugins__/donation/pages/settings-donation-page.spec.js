import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { SettingsDonationPage } from '~widget-plugins/donation/pages/settings-donation-page'

describe('client/mobilizations/widgets/__plugins__/donation/pages/settings-donation-page', () => {
  let wrapper
  const props = {
    dispatch: mock.noop,
    mobilization: { color_scheme: 'meurio' },
    fields: {
      title_text: 'title_text',
      button_text: 'button_text',
      main_color: 'main_color',
      default_donation_value: 'default_donation_value',
      donation_value1: 'donation_value1',
      donation_value2: 'donation_value2',
      donation_value3: 'donation_value3',
      donation_value4: 'donation_value4',
      donation_value5: 'donation_value5',
      recurring_period: 'recurring_period',
      payment_methods: 'payment_methods',
      payment_type: 'payment_type'
    }
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsDonationPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
