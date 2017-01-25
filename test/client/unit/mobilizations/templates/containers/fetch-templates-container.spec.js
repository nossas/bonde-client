import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FetchTemplatesContainer } from '~mobilizations/templates/containers/fetch-templates-container'

describe('client/mobilizations/templates/containers/fetch-templates-container', () => {
  let wrapper
  const props = {
    loading: false,
    isLoaded: true,
    asyncFetch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<FetchTemplatesContainer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
