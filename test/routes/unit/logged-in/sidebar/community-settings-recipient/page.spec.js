import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/sidebar/community-settings-recipient/page'

describe('routes/authenticated/sidebar/community-settings-recipient/page', () => {
  const props = {
    fields: {
      recipient: {
        transfer_interval: {},
        transfer_day: {},
        transfer_enabled: {},
        bank_account: {}
      }
    },
    location: { pathname: 'foobar.org' },
    // redux-form required props
    submit: mock.noop
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
