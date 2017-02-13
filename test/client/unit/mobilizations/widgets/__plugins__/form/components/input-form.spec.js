import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { InputForm } from '~widget-plugins/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/input-form', () => {
  let wrapper
  const props = {
    field: {
      kind: 'text',
      label: 'label',
      placeholder: 'placeholder',
      required: true
    }
  }

  beforeAll(() => {
    wrapper = shallow(<InputForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
