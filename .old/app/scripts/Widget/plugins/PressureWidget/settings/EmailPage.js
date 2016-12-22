import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import * as WidgetActions from '../../../actions'
import { FormFooter, InputTag } from '../../../components'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../../../Dashboard/Forms'
import { Base as PressureBase } from '../components/settings'
import { SettingsPageContentLayout } from '../../../../../components/Layout'

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
const patternTarget = /[\w]+[ ]*<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/

class EmailPage extends Component {
  constructor(props) {
    super(props)
    this.state = { targets: this.getTargetList() || [] }
  }

  getTargetString() {
    const { targets } = this.state
    return targets.filter(target => !!target.trim()).join(';')
  }

  getTargetList() {
    const { fields: { targets } } = this.props
    return targets && targets.value.split(';')
  }

  handleSubmit(values) {
    const { widget, credentials, editWidgetAsync, ...props } = this.props
    const targets = this.getTargetString()
    const settings = widget.settings || {}

    const data = { ...widget, settings: { ...settings, ...values, targets } }
    return editWidgetAsync(data)
  }

  render() {
    const { fields: { pressure_subject, pressure_body }, ...props } = this.props
    return (
      <PressureBase
        location={props.location}
        mobilization={props.mobilization}
        widget={props.widget}
      >
        <SettingsPageContentLayout>
          <FormRedux
            {...props}
            onSubmit={::this.handleSubmit}
            className="transparent"
            floatButton="Salvar"
            successMessage="Email para alvo configurado com sucesso!"
          >
            <div className="form-group">
              <InputTag
                label="Alvos"
                values={this.state.targets}
                onInsertTag={value => this.setState({ targets: [...this.state.targets, value] })}
                onRemoveTag={value => this.setState({
                  targets: this.state.targets.filter(tag => tag !== value)
                })}
                validate={value => {
                  const errors = { valid: true }
                  if (!value.match(patternTarget)) {
                    errors.valid = false
                    errors.message = 'Alvo fora do formato padrão. Ex.: Nome do alvo'
                      + ' <alvo@provedor.com>'
                  }
                  return errors
                }}
              />
            </div>
            <FormGroup controlId="email-subject-id" {...pressure_subject}>
              <ControlLabel>Assunto do email</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup controlId="email-body-id" {...pressure_body}>
              <ControlLabel>Corpo do email que será enviado</ControlLabel>
              <FormControl type="text" componentClass="textarea" />
            </FormGroup>
          </FormRedux>
        </SettingsPageContentLayout>
      </PressureBase>
    )
  }
}

EmailPage.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  editWidgetAsync: PropTypes.func.isRequired,
  // Redux form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

const fields = ['pressure_subject', 'pressure_body', 'targets']

const validate = values => {
  const errors = {}
  if (!values.pressure_subject) {
    errors.pressure_subject = 'Preenchimento obrigatório'
  }
  if (!values.pressure_body) {
    errors.pressure_body = 'Preenchimento obrigatório'
  }
  return errors
}

export default reduxForm({
  form: 'widgetForm',
  fields,
  validate
},
(state, ownProps) => ({
  initialValues: {
    ...ownProps.widget.settings || {},
    targets: ownProps.widget.settings && ownProps.widget.settings.targets
  },
  credentials: state.auth.credentials,
}), { ...WidgetActions })(EmailPage)
