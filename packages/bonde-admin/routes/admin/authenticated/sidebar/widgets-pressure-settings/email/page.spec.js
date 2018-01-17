import React from 'react'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { shallowWithIntl } from '~root/intl/helpers'
import Page from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page'

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {},
    handleSubmit: mock.noop,
    submitting: false
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
