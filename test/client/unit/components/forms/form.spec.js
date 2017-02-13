import React, { PropTypes } from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Form } from '~components/forms'

const Button = (props) => (
  <button>Done!</button>
)

Button.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

describe('client/components/forms/form', () => {

  it('should render without crashed', () => {
    const form = mount(<Form />)
    expect(form).to.be.ok
  })

  it('should render children', () => {
    const form = mount(
      <Form>
        <button type="button" />
      </Form>
    )
    expect(form.find('button').length).to.equal(1)
  })

  it('should call handleSubmit when submit form', () => {
    let handleSubmitCalled = false
    const form = mount(<Form handleSubmit={() => handleSubmitCalled = true} />)
    form.simulate('submit')
    expect(handleSubmitCalled).to.equal(true)
  })

  it('should pass pristine and submitting to children', () => {
    const form = mount(
      <Form pristine={false} submitting={true}>
        <Button />
      </Form>
    )
    expect(form.find('Button').props()).to.deep.equal({
      pristine: false,
      submitting: true
    })
  })
})
