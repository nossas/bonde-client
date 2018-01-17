import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from '~root/intl/helpers'
import Page from '~routes/admin/not-authenticated/account-register/page'

const dummyField = field => ({
  name: field,
  onChange: () => {}
})

describe('~routes/admin/not-authenticated/account-register/page', () => {
  const props = {
    submit: () => {},
    fields: {
      name: dummyField('name'),
      last_name: dummyField('last_name'),
      email: dummyField('email'),
      password: dummyField('password'),
      password2: dummyField('password2')
    },
    handleSubmit: () => {}
  }

  it('should render without crashed', () => {
    const page = mountWithIntl(<Page {...props} />)
    // eslint-disable-next-line no-unused-expressions
    expect(page).to.be.ok
  })
})
