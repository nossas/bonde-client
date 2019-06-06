import React from 'react'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'

import * as mock from 'utils/mock'
import Page from './page'

describe('routes/admin/authenticated/external/community-new/page', () => {
  const props = {
    fields: {
      name: {},
      city: {}
    },
    submitting: false,
    // Actions
    create: mock.noop
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} />)
  })
})
