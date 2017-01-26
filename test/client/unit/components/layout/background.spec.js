import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Background } from '~components/layout'

describe('client/components/layout/background', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<Background />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
