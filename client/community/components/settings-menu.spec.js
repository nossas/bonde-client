import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import SettingsMenu from '~client/community/components/settings-menu'

describe('client/community/components/settings-menu', () => {
  let wrapper
  const props = {
    location: {
      pathname: 'foobar.org'
    }
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsMenu {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
