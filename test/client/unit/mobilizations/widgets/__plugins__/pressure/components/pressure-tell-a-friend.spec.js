import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { PressureTellAFriend } from '~widget-plugins/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: {}
  }

  beforeAll(() => {
    wrapper = shallow(<PressureTellAFriend {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
