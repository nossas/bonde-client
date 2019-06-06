import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from 'intl/helpers'
import { MemoryRouter } from 'react-router-dom'

import Page from './page'

const dummyField = field => ({
  name: field,
  onChange: () => {}
})

describe('./page', () => {
  const props = {
    auth: {},
    submit: () => {},
    fields: {
      avatar: dummyField('avatar'),
      first_name: dummyField('first_name'),
      last_name: dummyField('last_name'),
      email: dummyField('email')
    },
    handleSubmit: () => {}
  }

  it('should render without crashed', () => {
    const page = mountWithIntl(
      <MemoryRouter>
        <Page {...props} />
      </MemoryRouter>
    )
    // eslint-disable-next-line no-unused-expressions
    expect(page).to.be.ok
  })
})
