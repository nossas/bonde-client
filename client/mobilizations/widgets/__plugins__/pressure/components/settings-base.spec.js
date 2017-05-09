import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsBase } from '~client/mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/settings-base', () => {
  let wrapper
  const props = {
    location: {
      pathname: 'foo/bar'
    },
    mobilization: {},
    widget: {}
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsBase {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
