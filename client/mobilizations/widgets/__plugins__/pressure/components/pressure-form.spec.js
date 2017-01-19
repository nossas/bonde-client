import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import PressureForm from './pressure-form'

describe('app/modules/widgets/__plugins__/pressure/components/pressure-form', () => {
  let wrapper
  const widget = { settings: {} }

  beforeEach(() => {
    wrapper = mount(<PressureForm widget={widget} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
    // check if errors not render without submit
    expect(wrapper.find('span.red').length).to.equal(0)
  })

  it('should render buttonColor according passed in props', () => {
    wrapper.setProps({ buttonColor: '#fff' })
    expect(wrapper.find('button').props().style.backgroundColor).to.equal('#fff')
  })

  it('should return onSubmit values of state when clicked button', () => {
    let returned
    const state = {
      email: 'igor@local.cc',
      name: 'igor',
      lastname: 'santos',
      city: '',
      subject: 'subject',
      body: 'body'
    }
    wrapper.setProps({ onSubmit: data => { returned = data } })
    wrapper.setState(state)

    wrapper.find('form').simulate('submit')
    expect(returned).to.deep.equal(state)
  })

  it('should render children', () => {
    wrapper.setProps({
      children: <div className='foo-bar-children' />
    })
    expect(wrapper.find('.foo-bar-children').length).to.equal(1)
  })

  it('should set default subject and body by props', () => {
    const wrapper = mount(
      <PressureForm
        widget={widget}
        subject='subject default'
        body='body default'
      />
    )
    expect(wrapper.instance().state.subject).to.equal('subject default')
    expect(wrapper.instance().state.body).to.equal('body default')
  })

  it('should change text of button when buttonText passed', () => {
    wrapper.setProps({
      buttonText: 'Enviar e-mail para o alvo'
    })
    expect(wrapper.find('button').text()).to.equal('Enviar e-mail para o alvo')
  })

  it('should render error and not call onSubmit if any field not fill', () => {
    let submitted
    wrapper.setProps({
      onSubmit: data => { submitted = data }
    })
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('span.error').length).to.equal(5)
    expect(submitted).to.equal(undefined)
  })
})
