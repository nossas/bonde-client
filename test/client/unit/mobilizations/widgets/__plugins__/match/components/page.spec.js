import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { Page } from '~widget-plugins/match/components'

describe('client/mobilizations/widgets/__plugins__/match/components/page', () => {
  let wrapper
  let props = {
    widget: {},
    mobilization: {},
    location: {}
  }

  describe('~ Default ~', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Page {...props}>
          <h1>Hello World</h1>
        </Page>
      )
    })

    it('should render a <h1 /> children component', () => {
      expect(wrapper.find('h1')).to.have.length(1)
    })

    it('should render a <h1 /> children component with its text properly', () => {
      expect(wrapper.find('h1').text()).to.equal('Hello World')
    })
  })
})
