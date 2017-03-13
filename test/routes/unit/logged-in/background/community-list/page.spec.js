import React from 'react'
import { shallow } from 'enzyme'

import * as mock from '~utils/mock'
import Page from '~routes/authenticated/background/community-list/page'

describe('routes/authenticated/background/community-list/page', () => {
  const props = {
    isLoaded: true,
    isLoading: false,
    communities: [{ id: 1 }],
    user: { first_name: 'Foo Bar' },
    // Actions
    select: mock.noop
  }

  it('should render without crashed', () => {
    shallow(<Page {...props} />)
  })
})
