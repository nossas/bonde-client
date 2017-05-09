import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { InputCounter } from '~client/components/form-util'

describe('client/components/form-util/input-counter', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<InputCounter {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
