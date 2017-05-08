import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Page from '~routes/admin/authenticated/sidebar/account-edit/page'

const dummyField = field => ({
  name: field,
  onChange: () => {}
})

describe('~routes/admin/authenticated/sidebar/account-edit/page', () => {
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
    const page = mount(<Page {...props} />)
    expect(page).to.be.ok
  })
})
