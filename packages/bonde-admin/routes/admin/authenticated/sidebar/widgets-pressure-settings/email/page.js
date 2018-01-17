import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, intlShape } from 'react-intl'

import * as os from '~client/utils/browser/os'
import * as validator from '~client/utils/validation-helper'
import * as pressureHelper from '~client/mobilizations/widgets/utils/pressure-helper'
import { FormGroup, ControlLabel, FormControl, RadioGroup, Radio } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { InputTag } from '~client/mobilizations/widgets/components'
import { Info } from '~client/components/notify'
import { Kbd } from '~client/components/markdown'

class PressureSettingsEmailPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      targets: this.getTargetList() || [],
      pressureType: pressureHelper.getType(this.getTargetList()) || undefined
    }
  }

  getTargetString (targets) {
    return targets.filter(target => !!target.trim()).join(';')
  }

  getTargetList () {
    const { fields: { targets } } = this.props
    return targets && targets.value.split(';')
  }

  handleSubmit (values) {
    const { widget, asyncWidgetUpdate } = this.props
    const settings = widget.settings || {}
    const targets = this.getTargetString(this.state.targets)

    return asyncWidgetUpdate({
      ...widget,
      settings: { ...settings, ...values, targets }
    })
  }

  render () {
    const {
      fields: {
        pressure_subject: pressureSubject,
        pressure_body: pressureBody,
        targets: targetsField,
        disable_edit_field: disableEditField,
        show_city: showCity
      },
      intl,
      ...props
    } = this.props
    return (
      <SettingsForm
        {...props}
        onSubmit={::this.handleSubmit}
        successMessage={
          intl.formatMessage({
            id: 'page--pressure-widget-email.success-message',
            defaultMessage: 'Email para alvo configurado com sucesso!'
          })
        }
      >
        <div className='form-group'>
          <InputTag
            label={
              intl.formatMessage({
                id: 'page--pressure-widget-email.form.input-tag.label',
                defaultMessage: 'Alvos'
              })
            }
            values={this.state.targets}
            onInsertTag={targets => {
              const targetsPushed = [...this.state.targets, ...targets]
              const pressureType = pressureHelper.getType(targetsPushed)
              this.setState({ targets: targetsPushed, pressureType })
              targetsField.onChange(this.getTargetString(targetsPushed))
            }}
            onRemoveTag={value => {
              const targets = this.state.targets.filter(tag => tag !== value)
              const pressureType = targets.length ? this.state.pressureType : undefined
              this.setState({ targets, pressureType })
              targetsField.onChange(this.getTargetString(targets))
            }}
            onRemoveAll={() => {
              const targets = []
              this.setState({ targets, pressureType: undefined })
              targetsField.onChange(this.getTargetString(targets))
              this.props.notifyAllTargetsRemoval()
            }}
            validate={targets => {
              const errors = { valid: true }
              if (targets.some(target => !(
                validator.isValidTargetEmail(target) ||
                validator.isValidTargetPhoneE164(target)
              ))) {
                errors.message = intl.formatMessage({
                  id: 'page--pressure-widget-email.form.input-tag.validation.invalid-target-format',
                  defaultMessage: 'Padrão inválido. Preencha conforme explicação acima.'
                })
              } else if (
                this.state.pressureType === 'email' &&
                targets.some(target => validator.isValidTargetPhoneE164(target))
              ) {
                errors.message = intl.formatMessage({
                  id: 'page--pressure-widget-email.form.input-tag.validation.type-email-registered',
                  defaultMessage: 'Você já cadastrou um alvo para pressão por email.'
                })
              } else if (
                this.state.pressureType === 'phone' &&
                targets.some(target => validator.isValidTargetEmail(target))
              ) {
                errors.message = intl.formatMessage({
                  id: 'page--pressure-widget-email.form.input-tag.validation.type-phone-registered',
                  defaultMessage: 'Você já cadastrou um alvo para pressão por telefone.'
                })
              }

              if (errors.message) errors.valid = false
              return errors
            }}
            helperText={
              <Info
                title={intl.formatMessage({
                  id: 'p--pressure-widget--input-tag.info.title',
                  defaultMessage: 'Como cadastrar alvos'
                })}
              >
                <FormattedMessage
                  id='p--pressure-widget--input-tag.info.text'
                  defaultMessage={
                    'O cadastro de alvos é bem simples e pode ser feito com mais de um alvo ' +
                    'por vez. Você precisa separar os alvos, em linhas distintas e, cada ' +
                    'alvo deve seguir o formato descrito abaixo. Para cadastrar basta ' +
                    'pressionar {keyboardTrigger}. E não se esqueça de salvar, clicando ' +
                    'no botão no canto superior direito da tela.'
                  }
                  values={{
                    keyboardTrigger: (
                      <span>
                        {os.isMac() ? <Kbd>cmd</Kbd> : <Kbd>ctrl</Kbd>}
                        +<Kbd>enter</Kbd>
                      </span>
                    )
                  }}
                />
                <ul style={{ paddingLeft: 15, marginBottom: 0 }}>
                  <li>
                    <FormattedMessage
                      id='p--pressure-widget--input-tag.info.item.target-format'
                      defaultMessage={
                        'Formato do alvo: {format} (obrigatório usar os caractéres ' +
                        '{lt} e {gt} para agrupar o email)'
                      }
                      values={{
                        format: (
                          <b>
                            <FormattedMessage
                              id='p--pressure-widget--input-tag.info.item.target-format.example'
                              defaultMessage='Nome <email@provedor.com>'
                            />
                          </b>
                        ),
                        lt: <Kbd>{'<'}</Kbd>,
                        gt: <Kbd>{'>'}</Kbd>
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id='p--pressure-widget--input-tag.info.item.sorting'
                      defaultMessage={
                        'Os alvos serão exibidos em ordem aleatória na widget de pressão.' +
                        'Ou seja, cada vez que a mobilização for acessada, a ordem de exibição ' +
                        'será diferente.'
                      }
                    />
                  </li>
                </ul>
              </Info>
            }
          />
        </div>
        <FormGroup controlId='email-subject-id' {...pressureSubject}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.email-subject.label'
              defaultMessage='Assunto do email'
            />
          </ControlLabel>
          <FormControl type='text' />
        </FormGroup>
        <FormGroup controlId='email-body-id' {...pressureBody}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.email-body.label'
              defaultMessage='Corpo do email que será enviado'
            />
          </ControlLabel>
          <FormControl type='text' componentClass='textarea' rows='7' />
        </FormGroup>
        <FormGroup controlId='disable-edit-field-id' {...disableEditField}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget-email.form.disable-edit-field.label'
              defaultMessage='Desabilitar edição de assunto e corpo do e-mail'
            />
          </ControlLabel>
          <RadioGroup>
            <Radio value='s'>
              <FormattedMessage
                id='page--pressure-widget-email.form.disable-edit-field.value.yes'
                defaultMessage='Sim'
              />
            </Radio>
            <Radio value='n'>
              <FormattedMessage
                id='page--pressure-widget-email.form.disable-edit-field.value.no'
                defaultMessage='Não'
              />
            </Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup controlId='show-city-field-id' {...showCity}>
          <ControlLabel>
            <FormattedMessage
              id='page--pressure-widget.form.show-city-field.label'
              defaultMessage='Mostrar campo de cidade'
            />
          </ControlLabel>
          <RadioGroup>
            <Radio value='city-true'>
              <FormattedMessage
                id='page--pressure-widget.form.show-city-field.radio.yes.label'
                defaultMessage='Sim'
              />
            </Radio>
            <Radio value='city-false'>
              <FormattedMessage
                id='page--pressure-widget.form.show-city-field.radio.no.label'
                defaultMessage='Não'
              />
            </Radio>
          </RadioGroup>
        </FormGroup>
      </SettingsForm>
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
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired
}

export default PressureSettingsEmailPage
