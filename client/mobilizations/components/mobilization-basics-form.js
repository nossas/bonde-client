import React from 'react'
import { InputCounter } from '../../../scripts/components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../scripts/Dashboard/Forms'
import MobilizationSettingsForm from './mobilization-settings-form'


export default (props) => {
  const { floatSubmit, fields: { name, goal }, ...formProps } = props

  const ComponentForm = floatSubmit ? MobilizationSettingsForm : FormRedux

  return (
    <ComponentForm {...formProps}>
      <FormGroup controlId="name" {...name}>
        <ControlLabel maxLength={100}>Nome</ControlLabel>
        <FormControl
          type="text"
          placeholder="Ex: Pela criação de uma delegacia de desaparecidos"
          maxLength={100}
        />
      </FormGroup>
      <FormGroup controlId="goal" {...goal}>
        <ControlLabel maxLength={500}>Objetivo</ControlLabel>
        <FormControl
          componentClass='textarea'
          placeholder={'Faça um texto curto, capaz de motivar outras pessoas a se unirem à'
            + ' sua mobilização. Você poderá alterar este texto depois.'}
          maxLength={500}
          rows="4"
        />
      </FormGroup>
    </ComponentForm>
  )
}

export const fields = ['name', 'goal', 'community_id']

export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Insira o nome da mobilização'
  } else if (values.name.length > 100) {
    errors.name = 'Seu título está muito longo!'
  }

  if (!values.goal) {
    errors.goal = 'Insira o objetivo da mobilização'
  } else if (values.goal.length > 500) {
    errors.goal = 'O limite de caracteres foi atingido.'
  }
  return errors
}
