import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { decorate } from 'react-mixin'
import { Navigation } from 'react-router'

import * as AccountActions from '../actions'
import logo from '../assets/logo-nossas.svg'

import * as Paths from '../../Paths'
import { FormRedux, FormError, FormGroup, ControlLabel, FormControl, SubmitButton } from '../../Dashboard/Forms'
import { isValidEmail } from '../../../util/validation-helper'


export default redirectUrl => {

  @decorate(Navigation)
  class LoginPage extends Component {

    componentWillReceiveProps(nextProps) {
      const { submitting } = this.props
      if (submitting && (!nextProps.submitting && !nextProps.submitFailed) && nextProps.user) {
        this.transitionTo(redirectUrl || '/')
      }
    }

    render() {
      const { login, fields: { email, password }, ...formProps } = this.props

      return (
        <div>
          <div className="col-8 mb3 mx-auto">
            <img src={logo} alt="Logo Nossas" />
          </div>
          <FormRedux nosubmit className="bg-white rounded" onSubmit={login} {...formProps}>
            <FormGroup controlId="emailId" {...email}>
              <ControlLabel>E-mail</ControlLabel>
              <FormControl type="email" placeholder="exemplo@email.com" />
            </FormGroup>
            <FormGroup controlId="passwordId" {...password}>
              <ControlLabel>Senha</ControlLabel>
              <FormControl type="password" placeholder="••••••••••" />
            </FormGroup>
            <SubmitButton className="white col-12 rounded-bottom">
              {formProps.submitting ? 'Carregando...' : 'Entrar'}
            </SubmitButton>
            <FormError className="mt2" />
          </FormRedux>
        </div>
      )
    }
  }

  LoginPage.propTypes = {
    // Injected by redux
    login: PropTypes.func.isRequired,
    // Injected by redux-form
    fields: PropTypes.object.isRequired
  }

  const fields = ['email', 'password']

  const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Informe seu email'
      errors.valid = false
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Email inválido'
      errors.valid = false
    }
    if (!values.password) {
      errors.password = 'Informe sua senha'
      errors.valid = false
    }
    return errors
  }

  return reduxForm({
    form: 'loginForm',
    fields,
    validate
  }, (state) => ({
    user: state.auth.user
  }), AccountActions)(LoginPage)
}
