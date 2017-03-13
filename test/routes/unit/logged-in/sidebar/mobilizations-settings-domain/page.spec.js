import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/authenticated/sidebar/mobilizations-settings-domain/page'

describe('routes/application/mobilizations-settings-domain/page', () => {
  let wrapper
  const props = {
    mobilization: {
      id: 1,
      slug: 'foo-bar.org'
    },
    fields: { custom_domain: 'http://foo.bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
