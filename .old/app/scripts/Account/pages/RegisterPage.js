import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { decorate } from 'react-mixin'
import { Navigation } from 'react-router'

import * as AccountActions from '../actions'
import { FormRedux, FormGroup, ControlLabel, FormControl, SubmitButton } from '../../Dashboard/Forms'
import * as Paths from '../../Paths'
import { isValidEmail } from '../../../util/validation-helper'


// @revert @decorate(Navigation)
class RegisterPage extends Component {

  componentWillReceiveProps(nextProps) {
    const { submitting } = this.props
    if (submitting && (!nextProps.submitting && !nextProps.submitFailed)) {
      this.transitionTo(Paths.login())
    }
  }

  render() {
    const { register, fields: { name, last_name, email, password, password2 }, ...formProps } = this.props
    return (
      <div>
        <h1>Crie sua conta no Bonde.</h1>
        <FormRedux
          nosubmit
          className="bg-white rounded"
          onSubmit={({ password2, ...values }) => register(values)}
          {...formProps}
        >
          <div className="flex">
            <FormGroup className="col-6" controlId="nameId" {...name}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl type="text" placeholder="Seu nome" />
            </FormGroup>
            <FormGroup className="col-6" controlId="lastNameId" {...last_name}>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl type="text" placeholder="Sobrenome" />
            </FormGroup>
          </div>
          <FormGroup controlId="emailId" {...email}>
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="email" placeholder="exemplo@email.com.br" />
          </FormGroup>
          <FormGroup controlId="passwordId" {...password}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl type="password" placeholder="********" />
          </FormGroup>
          <FormGroup controlId="password2Id" {...password2}>
            <ControlLabel>Confirme sua senha</ControlLabel>
            <FormControl type="password" placeholder="********" />
          </FormGroup>
          <SubmitButton className="col-12 rounded-bottom">
            {formProps.submitting ? 'Salvando...' : 'Criar conta'}
          </SubmitButton>
        </FormRedux>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  // Injected by redux-form
  fields: PropTypes.object.isRequired
}

const fields = ['name', 'last_name', 'email', 'password', 'password2']
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Informe seu nome'
  }
  if (!values.email) {
    errors.email = 'Informe seu e-mail'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'E-mail inválido'
  }
  if (!values.password) {
    errors.password = 'Informe uma senha'
  } else if (values.password.length < 8) {
    errors.password = 'Sua senha precisa ter um minímo de 8 caracteres.'
  }
  if (values.password && values.password !== values.password2) {
    errors.password2 = 'Senha não confere'
  }
  return errors
}

export default reduxForm({
  form: 'registerForm',
  fields,
  validate
}, null, AccountActions)(RegisterPage)
