import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

// Global module dependencies
import { SettingsPageContentLayout } from '../../../../../components/Layout'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  RadioGroup,
  Radio
} from '../../../../../scripts/Dashboard/Forms'

// Parent module dependencies
import { actions as WidgetActions } from '../../../../../modules/widgets'

// Current module dependencies
import { SettingsBase } from '../components'

const SettingsFormPage = ({
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
    <SettingsBase
      location={props.location}
      mobilization={props.mobilization}
      widget={props.widget}
    >
      <SettingsPageContentLayout>
        <FormRedux
          {...props}
          onSubmit={handleSubmit}
          className='transparent'
          floatButton='Salvar'
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
        </FormRedux>
      </SettingsPageContentLayout>
    </SettingsBase>
  )
}

SettingsFormPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Redux form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string
}

const fields = [
  'title_text',
  'button_text',
  'show_counter',
  'show_city',
  'count_text',
  'main_color'
]

const validate = values => {
  const errors = {}
  if (!values.title_text || values.title_text === '') {
    errors.title_text = 'Insira um título para o formulário'
  }
  if (!values.button_text) {
    errors.button_text = 'Insira um texto para o botão'
  }
  return errors
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    show_counter: 'false',
    show_city: 'city-false',
    count_text: 'pressões feitas',
    main_color: '#f23392',
    ...props.widget.settings || {}
  }
})

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
}, mapStateToProps, WidgetActions)(SettingsFormPage)
