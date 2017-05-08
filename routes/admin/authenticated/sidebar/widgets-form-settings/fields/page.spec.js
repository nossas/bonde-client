import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/widgets-form-settings/fields/page'

describe('routes/admin/authenticated/sidebar/widgets-form-settings/fields/page', () => {
  let wrapper
  const props = {
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
