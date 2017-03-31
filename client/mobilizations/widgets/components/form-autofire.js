import React, { PropTypes } from 'react'

import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import * as validator from '~client/utils/validation-helper'

const FormAutofire = props => {
  const {
    fields: {
      sender_name: senderName,
      sender_email: senderEmail,
      email_subject: emailSubject,
      email_text: emailText
    },
    widget,
    asyncWidgetUpdate,
    ...rest
  } = props

  return (
    <SettingsForm
      {...rest}
      buttonText='Salvar'
      onSubmit={values => {
        const settings = widget.settings || {}
        return asyncWidgetUpdate({ ...widget, settings: { ...settings, ...values } })
      }}
      successMessage='Mensagem de agradecimento configurada com sucesso!'
    >
      <FormGroup controlId='senderName' {...senderName}>
        <ControlLabel>Nome do remetente</ControlLabel>
        <FormControl
          type='text'
          placeholder='Defina o nome que irá aparecer na mensagem enviada.'
        />
      </FormGroup>
      <FormGroup controlId='senderEmail' {...senderEmail}>
        <ControlLabel>E-mail remetente</ControlLabel>
        <FormControl
          type='text'
          placeholder='Defina o e-mail que irá aparecer na mensagem enviada.'
        />
      </FormGroup>
      <FormGroup controlId='emailSubject' {...emailSubject}>
        <ControlLabel>Assunto do e-mail</ControlLabel>
        <FormControl
          type='text'
          placeholder='Defina o assunto que irá aparecer na mensagem enviada.'
        />
      </FormGroup>
      <FormGroup controlId='emailText' {...emailText}>
        <ControlLabel>Email de agradecimento</ControlLabel>
        <FormControl
          componentClass='textarea'
          rows='6'
          placeholder={'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua' +
            ' participação é muito importante e, agora, precisamos da sua ajuda para que mais' +
            ' gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um' +
            ' dos links abaixo. Um abraço.'}
        />
      </FormGroup>
    </SettingsForm>
  )
}

FormAutofire.propTypes = {
  fields: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export const fields = ['sender_name', 'sender_email', 'email_subject', 'email_text']

export const validate = values => {
  const errors = {}
  if (!validator.isValidEmail(values.sender_email)) {
    errors.sender_email = 'Informe um e-mail inválido'
  }
  return errors
}

export default FormAutofire
