import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Sidebar from '~components/navigation/sidebar/sidebar'

describe('client/components/navigation/sidebar/sidebar', () => {
  let wrapper
  const props = {
    loading: false,
    mobilization: { id: 1 },
    user: { email: 'foo@bar.com' },
    community: {}
  }

  beforeAll(() => {
    wrapper = shallow(
      <Sidebar {...props}>
        <h1>Foo bar</h1>
      </Sidebar>
    )
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
