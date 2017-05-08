import React from 'react'
import { shallow } from 'enzyme'

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
    shallow(<Page {...props} />)
  })
})
