import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { HelpBlock } from '~components/forms'

describe('client/components/forms/help-block', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <HelpBlock>
        Foo bar
      </HelpBlock>
    )
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render <em> tag', () => {
      expect(wrapper.find('em')).to.have.length(1)
    })
    it('should render <em> tag with its text properly', () => {
      expect(wrapper.find('em').text()).to.be.equal('Foo bar')
    })
  })
})
