import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { ZendeskWidget } from '~components/external-services'

describe('client/components/external-services/zendesk-widget', () => {
  const wrapper = shallow(<ZendeskWidget />)

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })

    it('should render root <script /> tag element', () => {
      expect(wrapper.find('script')).to.have.length(1)
    })
  })
})
