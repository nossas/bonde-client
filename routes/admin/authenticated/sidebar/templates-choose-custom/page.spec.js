import React from 'react'
import { expect } from 'chai'

import { shallowWithIntl } from '~root/intl/helpers'
import Page from '~routes/admin/authenticated/sidebar/templates-choose-custom/page'

describe('routes/admin/authenticated/sidebar/templates-choose-custom/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    createMobilizationFromTemplate: () => {}
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
