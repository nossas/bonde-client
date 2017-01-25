import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationSettingsForm } from '~mobilizations/components'

describe('client/mobilizations/components/mobilization-settings-form', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<MobilizationSettingsForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
