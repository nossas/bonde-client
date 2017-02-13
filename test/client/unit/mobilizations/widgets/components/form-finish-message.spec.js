import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

// Current module dependencies
import { FormFinishMessage } from '~mobilizations/widgets/components/form-finish-message'

const TellAFriend = props => (
  <div className='tell-a-friend' />
)

const SettingsMenu = props => (
  <div className='settings-menu' />
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
    SettingsMenu,
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
    wrapper = shallow(
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
      it('should render SettingsMenu component if the `finish_message_type` field is "custom"', () => {
        expect(wrapper.find('SettingsMenu')).to.have.length(1)
      })
    })
  })

  describe('fields', () => {
    describe('finish_message_type', () => {
      const field = () => wrapper.instance().props.fields.finish_message_type

      afterAll(() => {
        wrapper.setProps(props)
      })

      it('should initialize with default finish_message_type', () => {
        expect(field().value).to.equal('share')
      })
      it('should initialize with previously configured finish_message_type', () => {
        const value = 'custom'
        wrapper.setProps(widgetSettings(props, { finish_message_type: { ...field(), value } }))
        expect(field().value).to.equal(value)
      })
      it('should', () => {
        const value = 'custom'
        const settings = { finish_message_type: { ...field(), value } }
        wrapper.setProps(widgetSettings(props, settings))
        expect(field().value).to.equal(value)
      })
    })

    describe('finish_message', () => {
      const field = () => wrapper.instance().props.fields.finish_message

      afterAll(() => {
        wrapper.setProps(props)
      })

      it('should initialize with default finish_message', () => {
        expect(field().value).to.equal('Clique aqui para editar...')
      })
      it('should initialize with previously configured finish_message_type', () => {
        const value = '{"entityMap":{},"blocks":[{"key":"dhhdo","text":"Foobar","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":0,"length":6,"style":"center"},{"offset":0,"length":6,"style":"color: rgba(255,198,39,1);"}],"entityRanges":[],"data":{}}]}'
        wrapper.setProps(widgetSettings(props, { finish_message: { ...field(), value } }))
        expect(field().value).to.equal(value)
      })
    })
  })
})

const widgetSettings = (props, values) => ({
  ...props,
  fields: { ...props.fields, ...values }
})
