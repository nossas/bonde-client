import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { SettingsFieldsPage } from '~widget-plugins/form/pages/settings-fields-page'

describe('client/mobilizations/widgets/__plugins__/form/pages/settings-fields-page', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsFieldsPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
