import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import Donation from '~widget-plugins/donation/components'

describe('client/mobilizations/widgets/__plugins__/donation/components/__donation__', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {},
    editable: true,
    configurable: true,
    hasNewField: false
  }

  beforeAll(() => {
    wrapper = shallow(<Donation {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
