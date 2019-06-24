/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'

import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { InputForm } from 'mobilizations/widgets/__plugins__/form/components/input-form'

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
    wrapper = shallowWithIntl(<InputForm {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
