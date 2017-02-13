import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { DataExportPage } from '~mobilizations/widgets/pages/data-export-page'

describe('client/mobilizations/widgets/pages/data-export-page', () => {
  let wrapper
  const props = {
    params: { widget_id: '1' },
    loading: false,
    success: false,
    error: undefined,
    widgets: [{ id: 1 }],
    mobilization: { name: 'Foo bar' },
    // Actions
    asyncWidgetDataExport: mock.noop,
    dataExportMount: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<DataExportPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
