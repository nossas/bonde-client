import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from '@/intl/helpers/shallow-with-intl'

import { FormFinishMessage } from '@/mobilizations/widgets/components/form-finish-message'

const TellAFriend = props => (
  <div className='tell-a-friend' />
)

describe('client/mobilizations/widgets/components/form-finish-message', () => {
  let wrapper
  const props = {
    mobilization: { id: 1, color_scheme: 'nossas-scheme' },
    widget: { id: 1 },
    fields: {
      finish_message_type: { value: 'share' },
      finish_message: { value: 'Clique aqui para editar...' }
    },
    // Injected components
    TellAFriend,
    // Form Redux props
    submitting: false,
    handleSubmit: () => {},
    submitFailed: false,
    dirty: false,
    valid: false,
    // Actions
    asyncWidgetUpdate: () => {}
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(
      <FormFinishMessage {...props} />
    )
  })

  describe('render', () => {
    afterAll(() => {
      wrapper.setProps(props)
    })

    describe('preview', () => {
      it('should render TellAFriend component by default', () => {
        expect(wrapper.find('TellAFriend')).to.have.length(1)
      })
    })
  })

  describe('fields', () => {
    const field = () => wrapper.find('FormGroup[controlId="finish-message-type-id"]').props()

    describe('finish_message_type', () => {
      afterAll(() => {
        wrapper.setProps(props)
      })

      it('should initialize with default finish_message_type', () => {
        expect(field().value).to.equal('share')
      })
      it('should initialize with previously configured finish_message_type', () => {
        const value = 'custom'
        const settings = { finish_message_type: { ...field(), value } }
        wrapper.setProps(widgetSettings(props, settings))
        expect(field().value).to.equal(value)
      })
    })

    describe('finish_message', () => {
      afterAll(() => {
        wrapper.setProps(props)
      })

      it('should show EditorSlate when selects custom finish message', () => {
        const value = 'custom'
        const settings = { finish_message_type: { ...field(), value } }
        wrapper.setProps(widgetSettings(props, settings))
        expect(wrapper.find('EditorSlate')).to.have.length(1)
      })
      it('should initialize with default finish_message', () => {
        const value = 'custom'
        const settings = { finish_message_type: { ...field(), value } }
        wrapper.setProps(widgetSettings(props, settings))
        expect(wrapper.find('EditorSlate').props().content).to.equal('Clique aqui para editar...')
      })
      it('should initialize with RebooEditor component', () => {
        const typeValue = 'custom'
        const messageValue = '{"entityMap":{},"blocks":[{"key":"dhhdo","text":"Foobar","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":0,"length":6,"style":"center"},{"offset":0,"length":6,"style":"color: rgba(255,198,39,1);"}],"entityRanges":[],"data":{}}]}'
        const settings = {
          finish_message_type: { ...field(), value: typeValue },
          finish_message: { ...field(), value: messageValue }
        }
        wrapper.setProps(widgetSettings(props, settings))
        expect(wrapper.find('RebooEditor')).to.have.length(1)
      })
    })
  })
})

const widgetSettings = (props, values) => ({
  ...props,
  fields: { ...props.fields, ...values }
})
