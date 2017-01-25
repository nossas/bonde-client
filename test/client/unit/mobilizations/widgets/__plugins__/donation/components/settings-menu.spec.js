import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { SettingsMenu } from '~widget-plugins/donation/components'

describe('client/mobilizations/widgets/__plugins__/donation/components/donation-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    widget: { id: 1 },
    location: { pathname: 'foo/bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsMenu {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
