import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { ColorSchemer } from '~client/components/editor-wysihtml'

describe('client/components/editor-wysihtml/color-schemer', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<ColorSchemer {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
