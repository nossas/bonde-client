import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import classnames from 'classnames'

import * as WidgetActions from './../../../actions'
import * as Paths from './../../../../Paths'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../../Dashboard/Forms'
import { Menu } from './../components'
import { SettingsPageContentLayout } from '../../../../../components/Layout'

class FormWidgetForm extends React.Component {

  handleSubmit(values) {
    const { widget, credentials, editWidgetAsync, ...props } = this.props
    const settings = widget.settings || {}

    const data = { ...widget, settings: { ...settings, ...values } }
    return editWidgetAsync(data)
  }

  render() {
    const { fields: { call_to_action, button_text, count_text }, ...props } = this.props
    return (
      <div className="flex-auto flex flex-column bg-silver atomic relative">
        <Menu mobilization={props.mobilization} widget={props.widget} location={props.location} />
        <SettingsPageContentLayout>
          <FormRedux
            {...props}
            onSubmit={::this.handleSubmit}
            className="transparent"
            floatButton="Salvar"
            successMessage="Formulário configurado com sucesso!"
          >
            <FormGroup controlId="call-to-action-id" {...call_to_action}>
              <ControlLabel>Título do formulário</ControlLabel>
              <FormControl
                type="text"
                placeholder="Ex: Preencha o formulário abaixo para assinar a petição."
              />
            </FormGroup>
            <FormGroup controlId="button-text-id" {...button_text}>
              <ControlLabel>Botão</ControlLabel>
              <FormControl
                type="text"
                placeholder="Defina o texto do botão de confirmação do formulário."
              />
            </FormGroup>
            <FormGroup controlId="count-text-id" {...count_text}>
              <ControlLabel>Contador</ControlLabel>
              <FormControl
                type="text"
                placeholder="Defina o texto que ficará ao lado do número de pessoas que agiram."
              />
            </FormGroup>
          </FormRedux>
        </SettingsPageContentLayout>
      </div>
    )
  }
}

FormWidgetForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
}

const fields = ['call_to_action', 'button_text', 'count_text']

export default reduxForm({
  form: 'widgetForm',
  fields
},
(state, ownProps) => ({
  initialValues: ownProps.widget.settings || {},
  credentials: state.auth.credentials
}), { ...WidgetActions })(FormWidgetForm)
