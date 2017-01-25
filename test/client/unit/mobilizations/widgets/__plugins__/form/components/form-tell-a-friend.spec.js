import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { FormTellAFriend } from '~widget-plugins/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/form-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: {}
  }

  beforeAll(() => {
    wrapper = shallow(<FormTellAFriend {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
