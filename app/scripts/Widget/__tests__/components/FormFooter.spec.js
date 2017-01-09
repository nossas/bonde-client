import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { FormFooter } from '../../components'

describe('<FormFooter />', () => {
  let component

  beforeEach(() => {
    component = mount(<FormFooter />)
  })

  it('should render buttons footer to submit form', () => {
    expect(component.find('button').length).to.equal(1) // cancel button
    expect(component.find('input[type="submit"]').length).to.equal(1) // submit button
  })
})
