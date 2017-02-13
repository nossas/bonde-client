import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationBasicsForm } from '~mobilizations/components'

describe('client/mobilizations/components/mobilization-basics-form', () => {
  let wrapper
  const props = {
    floatSubmit: false,
    fields: {
      name: {},
      goal: {}
    }
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationBasicsForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should FormRedux when floatSubmit prop is false', () => {
      expect(wrapper.type().displayName).to.be.equal('FormRedux')
    })
    it('should MobilizationSettingsForm when floatSubmit prop is true', () => {
      wrapper = shallow(<MobilizationBasicsForm {...props} floatSubmit />)
      expect(wrapper.type().displayName).to.be.equal('MobilizationSettingsForm')
    })
  })
})
