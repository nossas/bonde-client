import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import FlatForm from '~client/ux/components/flat-form'

describe('client/ux/components/flat-form', () => {
  let wrapper
  const props = {
    formProps: {
      onSubmit: mock.noop,
      handleSubmit: mock.noop,
      submitting: false,
      submitFailed: false,
      dirty: false,
      valid: false
    },
    buttonText: 'Continuar'
  }
  const children = <h1>Foo Bar Children</h1>

  beforeAll(() => {
    wrapper = shallow(
      <FlatForm {...props}>
        {children}
      </FlatForm>
    )
  })

  it('should render without crash', () => {
    expect(wrapper).to.be.ok
  })

  it('should render children properly', () => {
    expect(wrapper.contains(children)).to.be.true
  })

  it('should render button with its text properly', () => {
    expect(wrapper.find('Button').children().text()).to.be.equal(props.buttonText)
  })

  it('should render FormRedux with `nosubmit` prop by default', () => {
    expect(wrapper.props().nosubmit).to.not.be.undefined
  })
})
