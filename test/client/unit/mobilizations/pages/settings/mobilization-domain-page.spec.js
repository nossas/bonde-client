import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationDomainPage } from '~mobilizations/pages/settings/mobilization-domain-page'

describe('client/mobilizations/pages/settings/mobilization-domain-page', () => {
  let wrapper
  const props = {
    mobilization: {
      id: 1,
      slug: 'foo-bar.org'
    },
    fields: { custom_domain: 'http://foo.bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationDomainPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
