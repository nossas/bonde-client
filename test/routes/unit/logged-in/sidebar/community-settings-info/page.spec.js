import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/admin/community-settings-info/page'

describe('routes/authenticated/admin/community-settings-info/page', () => {
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
    shallow(<Page {...props} />)
  })
})
