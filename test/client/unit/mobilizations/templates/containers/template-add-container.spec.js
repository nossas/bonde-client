import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateAddContainer } from '~mobilizations/templates/containers'

describe('client/mobilizations/templates/containers/template-add-container', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<TemplateAddContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
