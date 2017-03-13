import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/sidebar/widgets-pressure-settings/email/page'

describe('routes/application/widgets-pressure-settings/email/page', () => {
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
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
