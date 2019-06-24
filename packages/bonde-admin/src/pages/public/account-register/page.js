import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { BondeBackground } from 'components/layout/background'
import { Loading } from 'components/await'

import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'components/forms'

class RegisterPage extends Component {
  render () {
    const {
      fields: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password2,
        invitation_code: invitationCode
      },
      intl,
      ...formProps
    } = this.props

    return (
      <BondeBackground>
        <div className='page col-3'>
          <h1>
            <FormattedMessage
              id='page--account-register.title'
              defaultMessage='Crie sua conta no Bonde.'
            />
          </h1>
          {this.props.checkInvitationLoading && <Loading />}
          <FormRedux
            nosubmit
            className='bg-white rounded'
            {...formProps}
          >
            <div className='flex'>

              <FormGroup className='col-6' controlId='nameId' {...firstName}>
                <ControlLabel>
                  <FormattedMessage
                    id='page--account-register.form.name.label'
                    defaultMessage='Nome'
                />
                </ControlLabel>

                <FormControl
                  type='text'
                  placeholder={
                  intl.formatMessage({
                    id: 'page--account-register.form.name.placeholder',
                    defaultMessage: 'Seu nome'
                  })
                }
              />
              </FormGroup>

              <FormGroup className='col-6' controlId='lastNameId' {...lastName}>
                <ControlLabel>
                  <FormattedMessage
                    id='page--account-register.form.lastname.label'
                    defaultMessage='Sobrenome'
                  />
                </ControlLabel>

                <FormControl
                  type='text'
                  placeholder={
                      intl.formatMessage({
                        id: 'page--account-register.form.lastname.placeholder',
                        defaultMessage: 'Sobrenome'
                      })
                    }
                  />
              </FormGroup>
            </div>

            <FormGroup controlId='emailId' {...email}>
              <ControlLabel>
                <FormattedMessage
                  id='page--account-register.form.email.label'
                  defaultMessage='E-mail'
                />
              </ControlLabel>

              <FormControl
                disabled={invitationCode.value}
                type='email'
                placeholder={
                  intl.formatMessage({
                    id: 'page--account-register.form.email.placeholder',
                    defaultMessage: 'exemplo@email.com.br'
                  })
                }
              />
            </FormGroup>
            <FormGroup controlId='passwordId' {...password}>
              <ControlLabel>
                <FormattedMessage
                  id='page--account-register.form.password.label'
                  defaultMessage='Senha'
                />
              </ControlLabel>
              <FormControl type='password' placeholder='********' />
            </FormGroup>
            <FormGroup controlId='password2Id' {...password2}>
              <ControlLabel>
                <FormattedMessage
                  id='page--account-register.form.password-confirm.label'
                  defaultMessage='Confirme sua senha'
                />
              </ControlLabel>
              <FormControl type='password' placeholder='********' />
            </FormGroup>
            <Button type='submit' className='btn caps col-12 p2 white rounded-bottom bg-pagenta'>
              {formProps.submitting ? (
                <FormattedMessage
                  id='page--account-register.form.submit-button.saving'
                  defaultMessage='Salvando...'
                />
              ) : (
                <FormattedMessage
                  id='page--account-register.form.submit-button.default'
                  defaultMessage='Criar conta'
                />
              )}
            </Button>
          </FormRedux>
        </div>
      </BondeBackground>
    )
  }
}

RegisterPage.propTypes = {
  // Injected by react-redux
  submit: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

export default injectIntl(RegisterPage)