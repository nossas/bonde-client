import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { BlockHiddenTag } from '~mobilizations/blocks/components'

describe('client/mobilizations/blocks/components/block-hidden-tag', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<BlockHiddenTag />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
