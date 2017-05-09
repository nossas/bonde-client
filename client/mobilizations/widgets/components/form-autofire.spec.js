import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~utils/mock'
import { FormAutofire } from '~client/mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/form-autofire', () => {
  let wrapper
  const props = {
    fields: {
      sender_name: {},
      sender_email: {},
      email_subject: {},
      email_text: {}
    },
    mobilization: { id: 1 },
    widget: { kind: 'donation' },
    // Actions
    asyncWidgetUpdate: mock.noop
  }

  beforeAll(() => {
    wrapper = shallow(<FormAutofire {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
