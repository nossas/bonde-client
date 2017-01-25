import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateCreatePage } from '~mobilizations/templates/pages/template-create-page'

describe('client/mobilizations/templates/pages/template-create-page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    fields: {
      name: {},
      goal: {}
    }
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateCreatePage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
