import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import SettingsForm from '~client/components/settings-form'

describe('~client/components/settings-form', () => {

  let form
  const props = {
    submit: () => {},
    handleSubmit: () => {},
    submitting: false,
  }

  beforeEach(() => {
    form = mount(<SettingsForm {...props} />)
  })

  describe('by default', () => {

    it('should render DivFloat on top and right', () => {
      expect(form.find('DivFloat').props().horizontal).to.equal('right')
      expect(form.find('DivFloat').props().vertical).to.equal('top')
    })

    it('should render Button with type submit and text "Salvar"', () => {
      expect(form.find('Button').props().type).to.equal('submit')
      expect(form.find('Button').text()).to.equal('Salvar')
    })

    it('should render SuccessMessage with text "Dados editados com sucesso"', () => {
      expect(form.find('SuccessMessage').props().text).to.equal('Dados editados com sucesso')
    })
  })

  it('should be possible change button text', () => {
    form.setProps({ buttonText: 'Done!' })
    expect(form.find('Button').text()).to.equal('Done!')
  })

  it('should be possible change success message text', () => {
    form.setProps({ successMessage: 'Salvo com sucesso' })
    expect(form.find('SuccessMessage').props().text).to.equal('Salvo com sucesso')
  })

  it('should disable button when is submitting form', () => {
    form.setProps({ submitting: true })
    expect(form.find('Button').props().disabled).to.equal(true)
  })
})
