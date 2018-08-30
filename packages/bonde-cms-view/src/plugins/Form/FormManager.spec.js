import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { Button, Field, Form, Title } from './ui'
import FormManager from './FormManager'

const required = (field, value) => {
  if (field.required === 'true' && !value) {
    return `${field.label} não pode ficar em branco.`
  }
}

test.beforeEach(t => {
  t.context.defaultProps = {
    fields: [
      {
        "uid": "field-1534967789181-5",
        "kind": "email",
        "label": "Email",
        "placeholder": "Insira seu e-mail",
        "required": "true"
      },
      {
        "uid": "field-1534967803763-99",
        "kind": "text",
        "label": "Nome",
        "placeholder": "Insira seu nome",
        "required": "true"
      },
      {
        "uid": "field-1534971237536-91",
        "kind": "dropdown",
        "label": "Cidade",
        "placeholder": "São Paulo,Minas Gerais,Rio de Janeiro",
        "required": "false"
      }
    ],
    validations: {
      'dropdown': required,
      'text': required
    },
    onSubmit: values => new Promise(() => {})
  }
  t.context.node = shallow(<FormManager {...t.context.defaultProps} />)
})

test('should render fields passed by props', t => {
  const { node, defaultProps } = t.context
  const fields = node.find(Field)

  t.is(fields.length, defaultProps.fields.length)

  defaultProps.fields.forEach((f, index) => {
    const props = node.find(Field).at(index).props()
    t.deepEqual(props.field, f)
  })
})

test('should render Title when pass headerTitle', t => {
  const { node } = t.context
  
  t.is(node.find(Title).length, 0)

  const headerTitle = 'Dummy Header'
  node.setProps({ headerTitle })
  
  t.is(node.find(Title).length, 1)
  t.is(node.find(Title).props().children, headerTitle)
})

test('should render Button when pass submitLabel', t => {
  const { node } = t.context

  t.is(node.find(Button).length, 0)

  const submitLabel = 'Submit!'
  node.setProps({ submitLabel })

  t.is(node.find(Button).length, 1)
  t.is(node.find(Button).props().children, submitLabel)
})

test('should validate fields when submit form', t => {
  const { node, defaultProps } = t.context
  const { validations, fields } = defaultProps
  
  // test text and dropdown field, text is required and dropdown can be empty
  const textField = fields[1]
  const mockEvt = {
    preventDefault: () => true,
    target: {
      elements: {
        [fields[0].uid]: { value: 'mail@domain.com' },
        [textField.uid]: { value: '' },
        [fields[2].uid]: { value: '' }
      }
    }
  }
  node.find(Form).simulate('submit', mockEvt)
  
  t.deepEqual(node.instance().state.errors, {
    [textField.uid]: validations[textField.kind](textField, '')
  })
})

test('should pass error to Field', t => {
  const { node, defaultProps } = t.context
  
  const indexField = 1
  const textField = defaultProps.fields[indexField]
  const textErrorField = 'Required field.'
  node.setState({
    errors: {
      [textField.uid]: textErrorField
    }
  })

  t.is(node.find(Field).at(indexField).props().error, textErrorField)
})

test('should pass onBlur to Field', t => {
  const { node, defaultProps } = t.context
  
  const indexField = 1
  const textField = defaultProps.fields[indexField]
  const value = ''
  const textValidate = defaultProps.validations[textField.kind]

  node.find(Field).at(indexField).props().onBlur(textField, value)

  t.deepEqual(node.instance().state.errors, {
    [textField.uid]: textValidate(textField, value)
  })
})

test('should remove errors when onBlur isnt empty', t => {
  const { node, defaultProps } = t.context
  
  const indexField = 1
  const textField = defaultProps.fields[indexField]
  const value = 'insert text'
  const textValidate = defaultProps.validations[textField.kind]

  node.setState({
    errors: {
      [textField.uid]: 'required field'
    }
  })

  node.find(Field).at(indexField).props().onBlur(textField, value)

  t.deepEqual(node.instance().state.errors, {})
})

test('should disable button while submit form', async t => {
  const { node, defaultProps } = t.context
  const { fields } = defaultProps

  node.setProps({ submitLabel: 'Send!' })
  t.is(node.find(Button).props().disabled, false)
  
  node.setState({ submitting: true })
  t.is(node.find(Button).props().disabled, true)
})

test('should change submitting to false when onSubmit is success', async t => {
  const { node, defaultProps } = t.context
  const { fields } = defaultProps
  node.setProps({ onSubmit: () => new Promise((resolve) => resolve()) })
  
  const mockEvt = {
    preventDefault: () => true,
    target: {
      elements: {
        [fields[0].uid]: { value: 'mail@domain.com' },
        [fields[1].uid]: { value: 'name' },
        [fields[2].uid]: { value: 'dropdown' }
      }
    }
  }
  await node.find(Form).props().onSubmit(mockEvt)

  t.is(node.instance().state.submitting, false)
  t.is(node.instance().state.submitted, true)
})

test('should render successfullComponent when submit is success', t => {
  const { node } = t.context
  const SuccessfullyComponent = () => (
    <div className='successfully' />
  )
  
  t.is(node.find(SuccessfullyComponent).length, 0)
  
  node.setProps({ successfullyComponent: SuccessfullyComponent })
  node.setState({ submitted: true })

  t.is(node.find(SuccessfullyComponent).length, 1)
})

test('should render loadingComponent when submitting', t => {
  const { node } = t.context
  const LoadingComponent = () => (
    <div className='loading' />
  )

  t.is(node.find(LoadingComponent).length, 0)

  node.setProps({ loadingComponent: LoadingComponent })
  node.setState({ submitting: true })

  t.is(node.find(LoadingComponent).length, 1)
})
