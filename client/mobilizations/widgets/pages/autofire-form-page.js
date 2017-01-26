import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import { Loading } from '~components/await'
import { SettingsPageContentLayout } from '~components/layout'
import { FormRedux, FormGroup, ControlLabel, FormControl } from '~tmp-dashboard/forms'
import * as validator from '~utils/validation-helper'

// Children modules dependencies
import { SettingsMenu as PressureSettingsMenu } from '../__plugins__/pressure/components'
import { SettingsMenu as FormSettingsMenu } from '../__plugins__/form/components'
import { SettingsMenu as DonationSettingsMenu } from '../__plugins__/donation/components'

// Current module dependencies
import * as WidgetActions from '../action-creators'

export const AutofireFormPage = props => {
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
    asyncWidgetUpdate,
    ...rest
  } = props

  const handleSubmit = values => {
    const settings = widget.settings || {}
    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values }
    })
  }

  //
  // TODO: Needs to be refactored to modularized structure.
  // This is required to "abstract" the strategy of which Menu is needs to be shown.
  // And remove the conditions in lines between "refact" comments. May be isolate it in a container.
  //
  return widgets.length === 0
    ? <Loading />
    : (
      <div className='flex-auto flex flex-column'>
        {/* refact */}
        {(widget.kind === 'donation'
          ? <DonationSettingsMenu {...props} widget={widget} />
          : widget.kind === 'pressure'
            ? <PressureSettingsMenu
              mobilization_id={mobilization.id}
              widget_id={widget.id} {...props}
            />
            : <FormSettingsMenu {...props} widget={widget} />
        )}
        {/* refact */}
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
                placeholder={'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua' +
                  ' participação é muito importante e, agora, precisamos da sua ajuda para que mais' +
                  ' gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um' +
                  ' dos links abaixo. Um abraço.'}
              />
            </FormGroup>
          </FormRedux>
        </SettingsPageContentLayout>
      </div>
    )
}

AutofireFormPage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

const fields = ['sender_name', 'sender_email', 'email_subject', 'email_text']

const validate = values => {
  const errors = {}
  if (!validator.isValidEmail(values.sender_email)) {
    errors.sender_email = 'Informe um e-mail inválido'
  }
  return errors
}

const mapStateToProps = (state, props) => ({
  initialValues: props.widget.settings || {}
})

export default reduxForm(
  { form: 'widgetForm', fields, validate },
  mapStateToProps,
  WidgetActions
)(AutofireFormPage)
