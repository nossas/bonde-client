import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import { Field } from './ui'
import FormManager from './FormManager'

test.beforeEach(t => {
  t.context.defaultProps = {
    fields: [
      {
        "uid": "field-1534967789181-5",
        "kind": "email",
        "label": "Email",
        "placeholder": "Insira seu e-mail",
        "required": "true"
      },{
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
    ]
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

// TODO: more tests
