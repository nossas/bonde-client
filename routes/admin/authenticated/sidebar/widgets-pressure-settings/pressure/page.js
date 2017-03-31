import React, { PropTypes } from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  RadioGroup,
  Radio
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'

const PressureSettingsPage = ({
  ...props,
  fields: {
    title_text: titleText,
    button_text: buttonText,
    show_counter: showCounter,
    show_city: showCity,
    count_text: countText,
    main_color: mainColor
  }
}) => {
  const handleSubmit = values => {
    const { widget, asyncWidgetUpdate } = props
    const settings = widget.settings || {}

    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values }
    })
  }

  const {
    dispatch,
    mobilization: { color_scheme: colorScheme }
  } = props

  return (
    <SettingsForm
      {...props}
      onSubmit={handleSubmit}
      successMessage='Formulário de pressão configurado com sucesso!'
    >
      <FormGroup controlId='title-text-id' {...titleText}>
        <ControlLabel>Título do formulário</ControlLabel>
        <FormControl
          type='text'
          placeholder='Envie um e-mail para quem pode tomar essa decisão'
        />
      </FormGroup>
      <FormGroup controlId='button-text-id' {...buttonText}>
        <ControlLabel>Texto do botão</ControlLabel>
        <FormControl type='text' placeholder='Enviar e-mail' />
      </FormGroup>
      <FormGroup controlId='main-color-id' {...mainColor}>
        <ControlLabel>Cor do formulário</ControlLabel>
        <ColorPicker
          dispatch={dispatch}
          theme={colorScheme.replace('-scheme', '')}
        />
      </FormGroup>
      <FormGroup controlId='show-counter-id' {...showCounter}>
        <ControlLabel>Mostrar contador de pressão</ControlLabel>
        <RadioGroup>
          <Radio value='true'>Sim</Radio>
          <Radio value='false'>Não</Radio>
        </RadioGroup>
      </FormGroup>
      {(showCounter.value === 'true' ? (
        <FormGroup controlId='count-text-id' {...countText}>
          <ControlLabel>Texto do contador</ControlLabel>
          <FormControl type='text' placeholder='pressões feitas' />
        </FormGroup>
      ) : null)}
      <FormGroup controlId='show-city-field-id' {...showCity}>
        <ControlLabel>Mostrar campo de cidade</ControlLabel>
        <RadioGroup>
          <Radio value='city-true'>Sim</Radio>
          <Radio value='city-false'>Não</Radio>
        </RadioGroup>
      </FormGroup>
    </SettingsForm>
  )
}

PressureSettingsPage.propTypes = {
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default PressureSettingsPage
