import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { SubmitButton } from '~components/forms'

describe('client/components/forms/submit-button', () => {
  let wrapper
  const context = {
    $formRedux: {
      submitting: false
    }
  }
  const buttonText = 'foo bar submit button'

  beforeAll(() => {
    wrapper = shallow(<SubmitButton>{buttonText}</SubmitButton>, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render button with its text properly', () => {
      expect(wrapper.text()).to.be.equal(buttonText)
    })
    it('should render with active className when submitting is false', () => {
      expect(wrapper.props().className).to.have.string('bg-pagenta')
    })
    it('should render with inactive className when submitting is true', () => {
      wrapper.setContext({
        $formRedux: { submitting: true }
      })
      expect(wrapper.props().className).to.have.string('bg-gray95')
    })
  })
})
