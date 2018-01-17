import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/external/community-list/page'

describe('routes/admin/authenticated/external/community-list/page', () => {
  const props = {
    isLoaded: true,
    isLoading: false,
    communities: [{ id: 1 }],
    user: { first_name: 'Foo Bar' },
    // Actions
    select: mock.noop,
    asyncFetch: mock.noop
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
