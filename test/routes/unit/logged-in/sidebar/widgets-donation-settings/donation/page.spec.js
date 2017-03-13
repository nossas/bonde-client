import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/sidebar/widgets-donation-settings/donation/page'

describe('routes/application/widgets-donation-settings/donation/page', () => {
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
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
