//
// @route /account/retrieve
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'

import * as paths from '~client/paths'
import { isValidEmail } from '~client/utils/validation-helper'
import { asyncRetrievePassword } from '~client/account/redux/action-creators'
import Page from './page'

const fields = ['email']

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.email) {
    errors.email = intl.formatMessage({
      id: 'p--account-retrieve.form.email.validation.required',
      defaultMessage: 'Informe seu e-mail'
    })
  } else if (!isValidEmail(values.email)) {
    errors.email = intl.formatMessage({
      id: 'p--account-retrieve.form.email.validation.invalid-email-format',
      defaultMessage: 'E-mail inválido'
    })
  }
  return errors
}

const mapActionsToProps = (dispatch, { history }) => ({
  submit: user => dispatch(asyncRetrievePassword(user)).then(() => {
    history.push(paths.login())
  })
})

export default injectIntl(connect(undefined, mapActionsToProps)(
  reduxForm({ form: 'registerForm', fields, validate })(Page)
))
