import { reduxForm } from 'redux-form'

import * as AccountActions from '~client/account/redux/action-creators'
import AccountSelectors from '~client/account/redux/selectors'
import { isValidEmail } from '~client/utils/validation-helper'

import FormLogin from './page'

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

const mapStateToProps = state => {
  const selectors = AccountSelectors(state)
  return {
    user: selectors.getUser(),
    errorMessage: selectors.getError()
  }
}

export default reduxForm(
  { form: 'loginForm', fields, validate },
  mapStateToProps,
  AccountActions
)(FormLogin)
