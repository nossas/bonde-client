import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TemplatesChoosePage from '~routes/application/templates-choose/page'

describe('routes/application/templates-choose/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    templatesGlobalLength: 1,
    templatesCustomLength: 1
  }

  beforeAll(() => {
    wrapper = shallow(<TemplatesChoosePage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
