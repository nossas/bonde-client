import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/info/page'

describe('routes/admin/authenticated/sidebar/community-settings/info/page', () => {
  const props = {
    fields: {
      image: {},
      name: {},
      city: {},
      description: {}
    },
    location: {},
    community: {},
    // Actions
    downloadActivists: mock.noop
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} />)
  })
})
