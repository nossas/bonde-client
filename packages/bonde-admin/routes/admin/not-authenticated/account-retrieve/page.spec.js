import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from '~root/intl/helpers'
import Page from '~routes/admin/not-authenticated/account-retrieve/page'

const dummyField = field => ({
  name: field,
  onChange: () => {}
})

describe('~routes/admin/not-authenticated/account-retrieve/page', () => {
  const props = {
    submit: () => {},
    fields: { email: dummyField('email') },
    handleSubmit: () => {}
  }

  it('should render without crashed', () => {
    const page = mountWithIntl(<Page {...props} />)
    // eslint-disable-next-line no-unused-expressions
    expect(page).to.be.ok
  })
})
