import React, { Component, PropTypes } from 'react'

import { FormRedux, FormGroup, ControlLabel, FormControl } from '~components/forms'
import { InputTag } from '~mobilizations/widgets/components'

// Regex to validate Target (Ex.: Igor Santos <igor@nossascidades.org>)
// eslint-disable-next-line
const patternTarget = /[\w]+[ ]*<(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>/

class PressureSettingsEmailPage extends Component {
  constructor (props) {
    super(props)
    this.state = { targets: this.getTargetList() || [] }
  }

  getTargetString () {
    const { targets } = this.state
    return targets.filter(target => !!target.trim()).join(';')
  }

  getTargetList () {
    const { fields: { targets } } = this.props
    return targets && targets.value.split(';')
  }

  handleSubmit (values) {
    const { widget, asyncWidgetUpdate } = this.props
    const settings = widget.settings || {}
    const targets = this.getTargetString()

    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values, targets }
    })
  }

  render () {
    const {
      fields: {
        pressure_subject: pressureSubject,
        pressure_body: pressureBody
      },
      ...props
    } = this.props
    return (
      <FormRedux
        {...props}
        onSubmit={::this.handleSubmit}
        className='transparent'
        floatButton='Salvar'
        successMessage='Email para alvo configurado com sucesso!'
      >
        <div className='form-group'>
          <InputTag
            label='Alvos'
            values={this.state.targets}
            onInsertTag={value => this.setState({ targets: [...this.state.targets, value] })}
            onRemoveTag={value => this.setState({
              targets: this.state.targets.filter(tag => tag !== value)
            })}
            validate={value => {
              const errors = { valid: true }
              if (!value.match(patternTarget)) {
                errors.valid = false
                errors.message = 'Alvo fora do formato padrão. Ex.: Nome do alvo' +
                  ' <alvo@provedor.com>'
              }
              return errors
            }}
          />
        </div>
        <FormGroup controlId='email-subject-id' {...pressureSubject}>
          <ControlLabel>Assunto do email</ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='email-body-id' {...pressureBody}>
          <ControlLabel>Corpo do email que será enviado</ControlLabel>
          <FormControl type='text' componentClass='textarea' />
        </FormGroup>
      </FormRedux>
    )
  }
}

PressureSettingsEmailPage.propTypes = {
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default PressureSettingsEmailPage
