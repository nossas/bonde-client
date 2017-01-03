import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import * as WidgetActions from '../../../actions'
import { FormFooter } from '../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  RadioGroup,
  Radio
} from '../../../../Dashboard/Forms'
import { Base as PressureBase } from '../components/settings'
import { SettingsPageContentLayout } from '../../../../../components/Layout'

const FormPage = ({
  ...props,
  fields: {
    title_text,
    button_text,
    show_counter,
    show_city,
    count_text,
    main_color
  }
}) => {
  const handleSubmit = values => {
    const { widget, credentials, editWidgetAsync } = props
    const settings = widget.settings || {}
    const data = { ...widget, settings: { ...settings, ...values } }
    return editWidgetAsync(data)
  }
  const {
    dispatch,
    mobilization: { color_scheme: colorScheme }
  } = props

  return (
    <PressureBase
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
          <FormGroup controlId='title-text-id' {...title_text}>
            <ControlLabel>Título do formulário</ControlLabel>
            <FormControl
              type='text'
              placeholder='Envie um e-mail para quem pode tomar essa decisão'
            />
          </FormGroup>
          <FormGroup controlId='button-text-id' {...button_text}>
            <ControlLabel>Texto do botão</ControlLabel>
            <FormControl type='text' placeholder='Enviar e-mail' />
          </FormGroup>
          <FormGroup controlId='main-color-id' {...main_color}>
            <ControlLabel>Cor do formulário</ControlLabel>
            <ColorPicker
              dispatch={dispatch}
              theme={colorScheme.replace('-scheme', '')}
            />
          </FormGroup>
          <FormGroup controlId='show-counter-id' {...show_counter}>
            <ControlLabel>Mostrar contador de pressão</ControlLabel>
            <RadioGroup>
              <Radio value='true'>Sim</Radio>
              <Radio value='false'>Não</Radio>
            </RadioGroup>
          </FormGroup>
          {(show_counter.value === 'true' ? (
            <FormGroup controlId='count-text-id' {...count_text}>
              <ControlLabel>Texto do contador</ControlLabel>
              <FormControl type='text' placeholder='pressões feitas' />
            </FormGroup>
          ) : null)}
          <FormGroup controlId='show-city-field-id' {...show_city}>
            <ControlLabel>Mostrar campo de cidade</ControlLabel>
            <RadioGroup>
              <Radio value='city-true'>Sim</Radio>
              <Radio value='city-false'>Não</Radio>
            </RadioGroup>
          </FormGroup>
        </FormRedux>
      </SettingsPageContentLayout>
    </PressureBase>
  )
}

FormPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  editWidgetAsync: PropTypes.func.isRequired,
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
  },
  credentials: state.auth.credentials
})

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
}, mapStateToProps, WidgetActions)(FormPage)
