import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/admin/widgets-pressure-settings/pressure/page'

describe('routes/application/widgets-pressure-settings/preesure/page', () => {
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
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
