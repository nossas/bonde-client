import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { SettingsFormPage } from '~widget-plugins/pressure/pages/settings-form-page'

describe('client/mobilizations/widgets/__plugins__/pressure/pages/settings-form-page', () => {
  let wrapper
  const props = {
    mobilization: { color_scheme: 'meurio-scheme' },
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {
      show_counter: { value: true }
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined
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
