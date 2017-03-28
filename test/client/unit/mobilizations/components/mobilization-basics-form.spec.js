import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { MobilizationBasicsForm } from '~mobilizations/components'

describe('client/mobilizations/components/mobilization-basics-form', () => {
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
    valid: false
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationBasicsForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should FormRedux when floatSubmit prop is false', () => {
      expect(wrapper.find('FormRedux')).to.have.length(1)
    })
    it('should MobilizationSettingsForm when floatSubmit prop is true', () => {
      wrapper = shallow(<MobilizationBasicsForm {...props} floatSubmit />)
      expect(wrapper.find('MobilizationSettingsForm')).to.have.length(1)
    })
  })
})
