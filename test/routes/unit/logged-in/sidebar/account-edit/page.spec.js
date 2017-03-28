import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Page from '~routes/admin/authenticated/sidebar/account-edit/page'

const dummy_field = field => ({
  name: field,
  onChange: () => {}
})

describe('~routes/admin/authenticated/sidebar/account-edit/page', () => {
  const props = {
    auth: {},
    submit: () => {},
    fields: {
      avatar: dummy_field('avatar'),
      first_name: dummy_field('first_name'),
      last_name: dummy_field('last_name'),
      email: dummy_field('email')
    },
    handleSubmit: () => {}
  }

  it('should render without crashed', () => {
    const page = mount(<Page {...props} />)
    expect(page).to.be.ok
  })
})
