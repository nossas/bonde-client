import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TemplateFetchContainer } from '~mobilizations/templates/containers/template-fetch-container'

describe('client/mobilizations/templates/containers/template-fetch-container', () => {
  let wrapper
  const props = {
    loading: false,
    isLoaded: true,
    asyncFetch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TemplateFetchContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
