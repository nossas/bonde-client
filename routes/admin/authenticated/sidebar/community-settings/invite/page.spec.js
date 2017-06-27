import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/invite/page'

describe('routes/admin/authenticated/sidebar/community-settings/invite/page', () => {
  const props = {
    fields: { email: {} }
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} />)
  })
})
