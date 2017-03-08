import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FormCustomDomain } from '~mobilizations/components'

describe('client/mobilizations/components/form-custom-domain', () => {
  let wrapper
  const props = {
    mobilization: {
      slug: 'foo.bar'
    },
    fields: {
      custom_domain: { value: 'foo.bar.dev' }
    }
  }

  beforeAll(() => {
    wrapper = shallow(<FormCustomDomain {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
