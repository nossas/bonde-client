import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'

//
// TODO: The DonationWidgetMenu needs to be refactored to modularized structure.
// This is required to "abstract" the strategy of which Menu is needs to be shown.
// And remove the conditions in lines between 48 and 53. May be isolate it in container.
//
import { Loading } from '../../components'
import { Menu as FormWidgetMenu } from '../plugins/Form/components'
import { Menu as PressureWidgetMenu } from '../plugins/PressureWidget/components/settings'
import { Menu as DonationWidgetMenu } from '../plugins/Donation/components/settings'

import * as validator from '../../../util/validation-helper'
import * as WidgetActions from '../actions'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'
import { SettingsPageContentLayout } from '../../../components/Layout'

const AutoFireFormPage = (props) => {
  const {
    fields: {
      sender_name: senderName,
      sender_email: senderEmail,
      email_subject: emailSubject,
      email_text: emailText
    },
    widgets,
    widget,
    mobilization,
    credentials,
    editWidgetAsync,
    ...rest
  } = props

  const handleSubmit = values => {
    const settings = widget.settings || {}
    const data = { ...widget, settings: { ...settings, ...values } }
    return editWidgetAsync(data)
  }

  return (
    widgets.data.length === 0 ? <Loading /> :
    <div className='flex-auto flex flex-column'>
      {(widget.kind === 'donation'
        ? <DonationWidgetMenu {...props} widget={widget} />
        : widget.kind === 'pressure'
        ? <PressureWidgetMenu mobilization_id={mobilization.id} widget_id={widget.id} {...props} />
      : <FormWidgetMenu {...props} widget={widget} />
      )}
      <SettingsPageContentLayout>
        <FormRedux
          {...rest}
          className='transparent'
          floatButton='Salvar'
          onSubmit={handleSubmit}
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
              placeholder={'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua'
                + ' participação é muito importante e, agora, precisamos da sua ajuda para que mais'
                + ' gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um'
                + ' dos links abaixo. Um abraço.'}
            />
          </FormGroup>
        </FormRedux>
      </SettingsPageContentLayout>
    </div>
  )
}

AutoFireFormPage.propTypes = {
  fields: PropTypes.object.isRequired
}

const fields = ['sender_name', 'sender_email', 'email_subject', 'email_text']

const validate = values => {
  const errors = {}
  if (values.id && !/(UA|YT|MO)-\d+-\d+/i.test(values.id)) {
    errors.id = 'Informe uma ID válida'
  }
  if (!validator.isValidEmail(values.sender_email)) {
    errors.sender_email = 'Informe um e-mail inválido'
  }
  return errors
}

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: ownProps.widget.settings || {}
}), { ...WidgetActions })(AutoFireFormPage)
