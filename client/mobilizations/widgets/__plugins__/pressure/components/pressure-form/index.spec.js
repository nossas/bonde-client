/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import * as pressureHelper from '~client/mobilizations/widgets/utils/pressure-helper'
import { PressureForm } from '~client/mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-form', () => {
  let wrapper
  const targets = ['foo@bar.com', 'bar@foo.com', 'foo@baz.com']
  const widget = { settings: {} }

  beforeEach(() => {
    wrapper = mount(<PressureForm widget={widget} targetList={targets} />)
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
      phone: '',
      name: 'igor',
      lastname: 'santos',
      city: '',
      subject: 'subject',
      body: 'body',
      pressureType: pressureHelper.PRESSURE_TYPE_EMAIL
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
    const wrapper = mount(
      <PressureForm
        widget={widget}
        buttonText='Enviando...'
        buttonColor='#666'
        onSubmit={data => { submitted = data }}
        targetList={targets}
      />
    )
    wrapper.find('form').simulate('submit')
    expect(wrapper.find('span.error').length).to.equal(4)
    expect(submitted).to.equal(undefined)
  })

  describe('phone pressure', () => {
    beforeEach(() => {
      const targetsPhone = [
        'Isabelle Maitê <+551199999-9999>',
        'Betina Natália <+551199999-9999>',
        'Evelyn Pereira <+551199999-9999>',
        'Agatha Stefany Costa <+551199999-9999>'
      ]
      wrapper = mount(
        <PressureForm
          widget={widget}
          onSubmit={data => { submitted = data }}
          targetList={targetsPhone}
        />
      )
    })

    it('should render phone field when targets have phone number', () => {
      expect(wrapper.find('#pressure-sender-phone-id').length).to.equal(1)
    })

    it('should not render email field when targets have phone number', () => {
      expect(wrapper.find('#pressure-sender-email-id').length).to.equal(0)
    })
  })
})
