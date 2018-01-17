//
// @route /register
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import { isValidEmail } from '~client/utils/validation-helper'
import { asyncAddUser } from '~client/account/redux/action-creators'
import Page from './page'

const fields = ['first_name', 'last_name', 'email', 'password', 'password2']

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = intl.formatMessage({
      id: 'page--account-register.form.name.validation.required',
      defaultMessage: 'Informe seu nome'
    })
  }
  if (!values.email) {
    errors.email = intl.formatMessage({
      id: 'page--account-register.form.email.validation.required',
      defaultMessage: 'Informe seu e-mail'
    })
  } else if (!isValidEmail(values.email)) {
    errors.email = intl.formatMessage({
      id: 'page--account-register.form.email.validation.invalid-email-format',
      defaultMessage: 'E-mail inválido'
    })
  }
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: 'page--account-register.form.password.label.validation.required',
      defaultMessage: 'Informe uma senha'
    })
  } else if (values.password.length < 8) {
    errors.password = intl.formatMessage({
      id: 'page--account-register.form.password.label.validation.min-length',
      defaultMessage: 'Sua senha precisa ter um minímo de 8 caracteres.'
    })
  }
  if (values.password && values.password !== values.password2) {
    errors.password2 = intl.formatMessage({
      id: 'page--account-register.form.password-confirm.label.validation.match',
      defaultMessage: 'Senha não confere'
    })
  }
  return errors
}

const mapActionsToProps = dispatch => ({
  submit: ({ password2, ...user }) => dispatch(asyncAddUser(user))
})

export default injectIntl(connect(undefined, mapActionsToProps)(
  reduxForm({ form: 'registerForm', fields, validate })(Page)
))
