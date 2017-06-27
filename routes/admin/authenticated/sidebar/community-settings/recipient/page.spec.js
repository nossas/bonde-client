import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/recipient/page'

describe('routes/admin/authenticated/sidebar/community-settings/recipient/page', () => {
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
    shallowWithIntl(<Page {...props} />)
  })
})
