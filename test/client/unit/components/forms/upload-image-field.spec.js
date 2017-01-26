import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Global module dependencies
import * as mock from '~utils/mock'

// Current module dependencies
import { UploadImageField } from '~components/forms'

describe('client/components/forms/submit-button', () => {
  let wrapper
  const context = {
    $formGroup: {
      value: 'foo bar',
      onChange: mock.noop
    }
  }
  const props = {
    signingUrl: 'http://domain.com/image.png',
    theme: 'classic'
  }

  beforeAll(() => {
    wrapper = shallow(<UploadImageField {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
