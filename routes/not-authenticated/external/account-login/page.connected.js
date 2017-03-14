import * as authActions from '~account/action-creators'
import { reduxForm } from 'redux-form'
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

export default reduxForm({
  form: 'loginForm',
  fields,
  validate
}, undefined, { login: (values) => { authActions.login(values) } })(FormLogin)

// export default reduxForm({
//   form: 'formLogin',
//   onSubmit: (values, dispatch) => dispatch(authActions.login(values))
// })(FormLogin)
