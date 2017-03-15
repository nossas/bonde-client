import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/admin/widgets-donation-settings/export/page'

describe('routes/application/widgets-donation-settings/export/page', () => {
  let wrapper
  const props = {
    params: { widget_id: '1' },
    loading: false,
    success: false,
    error: undefined,
    widget: { id: 1 },
    mobilization: { name: 'Foo bar' },
    // Actions
    asyncWidgetDataExport: mock.noop,
    dataExportMount: mock.noop
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
