import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { SuccessMessage } from '~components/forms'

describe('client/components/forms/submit-button', () => {
  let wrapper
  const context = {
    $formRedux: {
      submitted: true
    }
  }
  const props = {
    text: 'foo bar'
  }

  beforeAll(() => {
    wrapper = shallow(<SuccessMessage {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render button with its text properly', () => {
      expect(wrapper.text()).to.be.equal(props.text)
    })
    it('should render <noscript /> when submitted is false', () => {
      wrapper.setContext({
        $formRedux: { submitted: false }
      })
      expect(wrapper.find('noscript')).to.have.length(1)
    })
  })
})
