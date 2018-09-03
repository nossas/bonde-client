import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import FormField from '../FormField'
import Select from './Select'
import SelectField from './'

test.beforeEach(t => {
  t.context.defaultProps = {
    uid: 'uu7182903',
    label: 'SelectLabel',
    opts: [],
    onBlur: () => '[called] onBlur',
    error: 'SelectError'
  }
  t.context.node = shallow(<SelectField {...t.context.defaultProps} />)
})

test('should pass label and error to FormField', t => {
  const { node, defaultProps } = t.context
  const formFieldProps = node.find(FormField).props()

  t.is(formFieldProps.label, defaultProps.label)
  t.is(formFieldProps.error, defaultProps.error)
})

test('should pass id and onBlur to select', t => {
  const { node, defaultProps } = t.context
  const selectProps = node.find(Select).props()

  t.is(selectProps.id, `input-${defaultProps.uid}`)
  t.is(selectProps.onBlur(), defaultProps.onBlur())
})

test('should render default option ---', t => {
  const { node } = t.context
  const option = node.find('option')

  t.is(option.props().children, '---')
})

test('should render options based on opts array', t => {
  const { node } = t.context
  const opts = ['SP', 'RJ']
  node.setProps({ opts })

  const options = node.find('option')

  // -1 is default value '---'
  t.is(options.length - 1, opts.length)

  // check first option
  let optionProps = options.at(1).props()
  t.is(optionProps.value, opts[0])
  t.is(optionProps.children, opts[0])

  // check second option
  optionProps = options.at(2).props()
  t.is(optionProps.value, opts[1])
  t.is(optionProps.children, opts[1])
})
