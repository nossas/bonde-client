import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplatesCreatePage from '~routes/application/templates-create/page'

describe('routes/application/templates-create/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    fields: {
      name: {},
      goal: {}
    }
  }

  beforeAll(() => {
    wrapper = shallow(<TemplatesCreatePage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
