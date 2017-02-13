import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TellAFriend } from '~components/share'

describe('client/components/share/tell-a-friend', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    href: 'http://foo.bar',
    message: 'Foo Bar Message',
    mobilization: { twitter_share_text: 'Twitter Share Text' }
  }

  beforeAll(() => {
    wrapper = shallow(<TellAFriend {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
