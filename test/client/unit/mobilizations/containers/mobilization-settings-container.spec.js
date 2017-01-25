import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationSettingsContainer } from '~mobilizations/containers/mobilization-settings-container'

describe('client/mobilizations/containers/mobilization-settings-container', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    location: { pathname: 'foo/bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationSettingsContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
