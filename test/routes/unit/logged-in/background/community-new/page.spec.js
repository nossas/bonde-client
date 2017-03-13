import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/background/community-new/page'

describe('routes/authenticated/background/community-new/page', () => {
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
    shallow(<Page {...props} />)
  })
})
