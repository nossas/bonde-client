import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import FormManager from './FormManager'
import FormWidget from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    widget: {
      settings: {
        fields: [ { uid: 'field-1', kind: 'text' } ],
        mainColor: '#000',
        buttonText: 'Submit!',
        callToAction: 'Call to action!'
      }
    },
    config: {
      validations: [{ kind: 'text', validate: () => {} }],
      onSubmit: () => '[called] on submit',
      successfullyComponent: () => (<div className='successfully' />),
      loadingComponent: () => (<div className='loading' />)
    }
  }
  t.context.node = shallow(<FormWidget {...t.context.defaultProps} />)
})

test('should pass config validations and submit to FormManager', t => {
  const { node, defaultProps } = t.context
  const formManager = node.find(FormManager)
  
  t.is(formManager.props().onSubmit(), defaultProps.config.onSubmit())
  t.is(formManager.props().validations, defaultProps.config.validations)
})

test('should pass widget settings fields to FormManager', t => {
  const { node, defaultProps } = t.context
  const formManager = node.find(FormManager)
  
  t.deepEqual(formManager.props().fields, defaultProps.widget.settings.fields)
})

test('should pass widget settings form to FormManager', t => {
  const { node, defaultProps } = t.context
  const { settings } = defaultProps.widget
  const formManagerProps = node.find(FormManager).props()
  
  t.is(formManagerProps.headerTitle, settings.callToAction)
  t.is(formManagerProps.submitLabel, settings.buttonText)
  t.is(formManagerProps.bgColor, settings.mainColor)
})

test('should pass successfullyComponent to FormManager', t => {
  const { node, defaultProps } = t.context
  const formProps = node.find(FormManager).props()
  const { config } = defaultProps

  t.deepEqual(formProps.successfullyComponent, config.successfullyComponent)
})

test('should pass loadingComponent to FormManager', t => {
  const { node, defaultProps } = t.context
  const formProps = node.find(FormManager).props()
  const { config } = defaultProps

  t.deepEqual(formProps.loadingComponent, config.loadingComponent)
})
