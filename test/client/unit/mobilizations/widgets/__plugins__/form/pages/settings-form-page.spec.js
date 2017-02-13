import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { SettingsFormPage } from '~widget-plugins/form/pages'

describe('client/mobilizations/widgets/__plugins__/form/pages/settings-form-page', () => {
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
    wrapper = shallow(<SettingsFormPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
