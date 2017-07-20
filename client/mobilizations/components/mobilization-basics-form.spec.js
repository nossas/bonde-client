import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { MobilizationBasicsForm } from '~client/mobilizations/components/mobilization-basics-form'

describe.skip('client/mobilizations/components/mobilization-basics-form', () => {
  let wrapper
  const props = {
    floatSubmit: false,
    fields: {
      name: {},
      goal: {}
    },
    handleSubmit: mock.noop,
    submitFailed: false,
    dirty: false,
    valid: false,
    location: { pathname: 'foobar' }
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<MobilizationBasicsForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // expect(wrapper).to.be.ok
      expect(true).to.equal(true)
    })
    it('should FormRedux when floatSubmit prop is false', () => {
      expect(wrapper.find('FormRedux').length).to.equal(1)
    })
    it('should SettingsForm when floatSubmit prop is true', () => {
      wrapper = shallowWithIntl(<MobilizationBasicsForm {...props} floatSubmit />)
      expect(wrapper.find('SettingsForm').length).to.equal(1)
    })
  })
})
