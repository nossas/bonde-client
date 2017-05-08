import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const FormSettingsPage = ({
  fields: {
    call_to_action: callToAction,
    button_text: buttonText,
    count_text: countText
  },
  widget,
  asyncWidgetUpdate,
  ...formProps
}) => (
  <SettingsForm
    {...formProps}
    onSubmit={values => {
      const settings = widget.settings || {}

      return asyncWidgetUpdate({
        ...widget,
        settings: { ...settings, ...values }
      })
    }}
    successMessage='Formulário configurado com sucesso!'
  >
    <FormGroup controlId='call-to-action-id' {...callToAction}>
      <ControlLabel>Título do formulário</ControlLabel>
      <FormControl
        type='text'
        placeholder='Ex: Preencha o formulário abaixo para assinar a petição.'
      />
    </FormGroup>
    <FormGroup controlId='button-text-id' {...buttonText}>
      <ControlLabel>Botão</ControlLabel>
      <FormControl
        type='text'
        placeholder='Defina o texto do botão de confirmação do formulário.'
      />
    </FormGroup>
    <FormGroup controlId='count-text-id' {...countText}>
      <ControlLabel>Contador</ControlLabel>
      <FormControl
        type='text'
        placeholder='Defina o texto que ficará ao lado do número de pessoas que agiram.'
      />
    </FormGroup>
  </SettingsForm>
)

FormSettingsPage.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default FormSettingsPage
