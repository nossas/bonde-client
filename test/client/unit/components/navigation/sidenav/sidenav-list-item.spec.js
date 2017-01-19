import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SidenavListItem } from '~components/navigation/sidenav'

describe('client/components/navigation/sidenav/sidenav', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<SidenavListItem {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
