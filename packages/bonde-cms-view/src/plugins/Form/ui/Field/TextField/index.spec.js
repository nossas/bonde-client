import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import FormField from '../FormField'
import Input from './Input'
import TextField from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    uid: 'uu7182903',
    label: 'TextLabel',
    placeholder: 'TextPlaceholder',
    opts: [],
    onBlur: () => '[called] onBlur',
    error: 'TextError'
  }
  t.context.node = shallow(<TextField {...t.context.defaultProps} />)
})

test('should pass label and error to FormField', t => {
  const { node, defaultProps } = t.context
  const formFieldProps = node.find(FormField).props()

  t.is(formFieldProps.label, defaultProps.label)
  t.is(formFieldProps.error, defaultProps.error)
})

test('should pass id and onBlur to input', t => {
  const { node, defaultProps } = t.context
  const inputProps = node.find(Input).props()

  t.is(inputProps.id, `input-${defaultProps.uid}`)
  t.is(inputProps.onBlur(), defaultProps.onBlur())
})

test('should pass kind like type and placeholder to Input', t => {
  const { node, defaultProps } = t.context
  const inputProps = node.find(Input).props()

  t.is(inputProps.type, defaultProps.kind)
  t.is(inputProps.placeholder, defaultProps.placeholder)
})
