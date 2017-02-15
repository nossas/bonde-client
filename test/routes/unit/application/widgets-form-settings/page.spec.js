import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import Page from '~routes/application/widgets-form-settings/page'

describe('routes/application/widgets-form-settings/page', () => {
  let wrapper
  const props = {
    fields: {
      call_to_action: 'callToAction',
      button_text: 'buttonText',
      count_text: 'countText'
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined,
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop
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
