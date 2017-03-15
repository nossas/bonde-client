import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/authenticated/admin/widgets-form-settings/finish/page'

describe('routes/application/widgets-form-settings/finish/page', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<Page />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
