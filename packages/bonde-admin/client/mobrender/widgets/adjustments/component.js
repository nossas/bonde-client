/**
 * AdjustmentsForm
 *
 * Um componente para para submeter formulários de ajustes de widgets.
 */
import React from 'react'
import { intlShape, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  HelpBlock
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const AdjustmentsSettingsForm = (props) => {
  const {
    children,
    fields: {
      call_to_action: callToAction,
      button_text: buttonText,
      count_text: countText,
      main_color: mainColor
    },
    widget,
    asyncWidgetUpdate,
    // TODO: Remover essa dependencia da mobilização
    dispatch,
    colorScheme,
    intl,
    ...formProps
  } = props
  return (
    <SettingsForm
      {...formProps}
      onSubmit={values => {
        const settings = widget.settings || {}

        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values }
        })
      }}
      successMessage={intl.formatMessage({
        id: 'adjustments.form.successMessage',
        defaultMessage: 'Formulário configurado com sucesso!'
      })}
    >
      <FormGroup controlId='call-to-action-id' {...callToAction}>
        <ControlLabel>
          <FormattedMessage
            id='adjustments.form.call-to-action.label'
            defaultMessage='Título do formulário'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={intl.formatMessage({
            id: 'adjustments.form.call-to-action.placeholder',
            defaultMessage: 'Ex: Preencha o formulário abaixo para assinar a petição.'
          })}
        />
      </FormGroup>
      <FormGroup controlId='button-text-id' {...buttonText}>
        <ControlLabel>
          <FormattedMessage
            id='adjustments.form.button-text.label'
            defaultMessage='Botão'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={intl.formatMessage({
            id: 'adjustments.form.button-text.placeholder',
            defaultMessage: 'Defina o texto do botão de confirmação do formulário.'
          })}
        />
      </FormGroup>
      <FormGroup controlId='count-text-id' {...countText}>
        <ControlLabel>
          <FormattedMessage
            id='adjustments.form.count-text.label'
            defaultMessage='Contador'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={intl.formatMessage({
            id: 'adjustments.form.count-text.placeholder',
            defaultMessage: 'Defina o texto que ficará ao lado do número de pessoas que agiram.'
          })}
        />
        <HelpBlock>
          <FormattedMessage
            id='adjustments.form.count-text.helpBlock'
            defaultMessage='O contador será mostrado se existir um texto definido.'
          />
        </HelpBlock>
      </FormGroup>
      <FormGroup controlId='main-color-id' {...mainColor}>
        <ControlLabel>
          <FormattedMessage
            id='adjustments.form.main-color.label'
            defaultMessage='Cor padrão'
          />
        </ControlLabel>
        <HelpBlock>
          <FormattedMessage
            id='adjustments.form.main-color.helpBlock'
            defaultMessage='Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.'
          />
        </HelpBlock>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>
      {children}
    </SettingsForm>
  )
}

AdjustmentsSettingsForm.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by widgets/models/ModelForm
  colorScheme: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by react-intl
  intl: intlShape.isRequired
}

export default AdjustmentsSettingsForm
