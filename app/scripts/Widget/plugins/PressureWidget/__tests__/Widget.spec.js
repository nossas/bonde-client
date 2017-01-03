import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { PressureWidget } from '../Widget'

describe('app/scripts/Widget/plugins/PressureWidget/Widget', () => {
  let widget
  const props = {
    editable: false,
    mobilization: { id: 1 },
    widget: { id: 1, settings: {} }
  }
  const mockContext = { router: {} }

  beforeEach(() => {
    widget = shallow(<PressureWidget {...props} />, { context: mockContext })
  })

  it('should color with main_color, h2, a, PressureForm, PressureCount', () => {
    widget.setProps({ widget: { id: 1, settings: { main_color: '#fff', show_counter: 'true' } } })

    expect(widget.find('h2').props().style.backgroundColor).to.equal('#fff')
    expect(widget.find('PressureForm').props().buttonColor).to.equal('#fff')
    expect(widget.find('PressureCount').props().color).to.equal('#fff')
  })

  it('should render h2 with title_text', () => {
    const title_text = 'Envie um e-mail para quem quer tomar essa decisão'
    widget.setProps({ widget: { id: 1, settings: { title_text } } })

    expect(widget.find('h2').text()).to.equal(title_text)
  })

  it('should render PressureForm with pressure_subject and pressure_body', () => {
    const pressure_subject = 'Não derrubem a escola'
    const pressure_body = 'Sra. Renata da Costa, favor não derrubar...'
    widget.setProps({ widget: { id: 1, settings: { pressure_subject, pressure_body } } })

    expect(widget.find('PressureForm').props().subject).to.equal(pressure_subject)
    expect(widget.find('PressureForm').props().body).to.equal(pressure_body)
  })

  it('should render PressureForm with button_text', () => {
    const button_text = 'Enviar e-mail'
    widget.setProps({ widget: { id: 1, settings: { button_text } } })

    expect(widget.find('PressureForm').props().buttonText).to.equal(button_text)
  })

  it('should render ok with values default when settings is undefined', () => {
    widget.setProps({ widget: { id: 1, settings: undefined } })
    expect(widget).to.be.ok
  })

  it('should hide PressureCount when show_counter is "false"', () => {
    widget.setProps({ widget: { id: 1, settings: { show_counter: 'false' }} })
    expect(widget.find('PressureCount').length).to.equal(0)
  })

  it('should render targets received by settings with type string', () => {
    widget.setProps({ widget: { id: 1, settings: { targets: 'Igor Santos <igor@nossascidades.org>' }} })
    expect(widget.find('TargetList').props().targets).to.deep.equal(['Igor Santos <igor@nossascidades.org>'])

    widget.setProps({
      widget: {
        id: 1,
        settings: {
          targets: 'Igor Santos <igor@nossascidades.org>;Lucas Pirola <pirola@nossascidades.org>'
        }
      }
    })
    expect(widget.find('TargetList').props().targets).to.deep.equal(['Igor Santos <igor@nossascidades.org>', 'Lucas Pirola <pirola@nossascidades.org>'])
  })

  it('should render TellAFriend when widget.filled', () => {
    widget.setProps({ widget: {...props.widget, filled: true } })
    expect(widget.find('TellAFriend').length).to.equal(1)
  })
})
