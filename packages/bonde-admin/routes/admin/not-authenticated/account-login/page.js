import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage, intlShape } from 'react-intl'
import { BondeBackground } from '~client/components/layout/background'
import * as paths from '~client/paths'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Raise
} from '~client/components/forms'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

const InputError = (field) => field.error && field.touched ? (
  <Raise error={field.error} />
) : undefined

class LoginPage extends Component {
  componentWillReceiveProps (nextProps) {
    const { fields: { password }, errorMessage, resetErrorMessage } = this.props

    // checking if user has typed after wrong password error has been displayed
    if (password.value !== nextProps.fields.password.value && errorMessage) {
      resetErrorMessage()
    }
  }

  render () {
    const {
      fields: { email, password },
      login,
      errorMessage,
      intl,
      ...formProps
    } = this.props

    return (
      <BondeBackground>
        <div className='page col-3'>
          <div className='col-8 mb3 mx-auto'>
            <img alt='Logo Bonde' src={
              require('exenv').canUseDOM
                ? require('~client/images/logo-nossas.svg')
                : null
            } />
          </div>
          <FormRedux
            nosubmit
            className='bg-white rounded'
            onSubmit={values => login(values)}
            {...formProps}
          >
            <FormGroup controlId='emailId' {...email}>
              <ControlLabel>
                <FormattedMessage
                  id='page--account-login.label.email'
                  defaultMessage='E-mail'
                />
              </ControlLabel>
              <FormControl
                type='email'
                placeholder={
                  intl.formatMessage({
                    id: 'page--account-login.placeholder.email',
                    defaultMessage: 'exemplo@email.com'
                  })
                }
              />
            </FormGroup>
            <FormGroup controlId='passwordId' {...password}>
              <ControlLabel hideError>
                <FormattedMessage
                  id='page--account-login.label.password'
                  defaultMessage='Senha'
                />
                {InputError(password)}
                {errorMessage && !formProps.submitting && !password.error && password.touched ? (
                  <span className='red'>
                    {` - ${errorMessage} `}
                    <Link to={paths.accountRetrieve()} className={styles.error}>
                      <FormattedMessage
                        id='page--account-login.auth.error-message.retrieve-password.link'
                        defaultMessage='Esqueceu sua senha?'
                      />
                    </Link>
                  </span>
                ) : null}
              </ControlLabel>
              <FormControl
                type='password'
                placeholder='••••••••••'
              />
            </FormGroup>
            <Button type='submit' className='btn py2 caps white col-12 rounded-bottom bg-pagenta'>
              {formProps.submitting ? (
                <FormattedMessage
                  id='page--account-login.loading'
                  defaultMessage='Carregando...'
                />
              ) : (
                <FormattedMessage
                  id='page--account-login.signin'
                  defaultMessage='Entrar'
                />
              )}
            </Button>
          </FormRedux>
        </div>
      </BondeBackground>
    )
  }
}

LoginPage.propTypes = {
  // Injected by redux
  login: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  // Intl shape
  intl: intlShape.isRequired
}

export default LoginPage
