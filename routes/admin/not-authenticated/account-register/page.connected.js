import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { isValidEmail } from '~client/utils/validation-helper'
import { asyncAddUser } from '~client/account/redux/action-creators'
import Page from './page'

const fields = ['first_name', 'last_name', 'email', 'password', 'password2']

const validate = values => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Informe seu nome'
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

const mapActionsToProps = dispatch => ({
  submit: ({ password2, ...user }) => dispatch(asyncAddUser(user))
})

export default connect(undefined, mapActionsToProps)(
  reduxForm({ form: 'registerForm', fields, validate })(Page)
)
