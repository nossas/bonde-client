import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MobilizationSharingPage } from '~mobilizations/pages/settings/mobilization-sharing-page'

describe('client/mobilizations/pages/settings/mobilization-sharing-page', () => {
  let wrapper
  const props = {
    fields: {
      facebook_share_image: 'facebook_share_image',
      facebook_share_title: 'facebook_share_title',
      facebook_share_description: 'facebook_share_description',
      twitter_share_text: 'twitter_share_text'
    }
  }

  beforeAll(() => {
    wrapper = shallow(<MobilizationSharingPage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
