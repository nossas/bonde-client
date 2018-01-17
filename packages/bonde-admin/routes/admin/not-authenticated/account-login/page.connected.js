//
// @route /login
//
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import * as paths from '~client/paths'
import { createAction } from '~client/utils/redux'
import { isValidEmail } from '~client/utils/validation-helper'

import AccountSelectors from '~client/account/redux/selectors'
import authenticate from '~client/account/queries/authenticate'
import * as authType from '~client/account/redux/action-types'

import FormLogin from './page'

const fields = ['email', 'password']

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.email) {
    errors.email = intl.formatMessage({
      id: 'p--account-login.form.email.validation.required',
      defaultMessage: 'Informe seu email'
    })
    errors.valid = false
  } else if (!isValidEmail(values.email)) {
    errors.email = intl.formatMessage({
      id: 'p--account-login.form.email.validation.invalid',
      defaultMessage: 'Email inválido'
    })
    errors.valid = false
  }
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: 'p--account-login.form.password.validation.required',
      defaultMessage: 'Informe sua senha'
    })
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

const mapActionsToProps = (dispatch, props) => ({...props,
  login: values => {
    props.mutate({ variables: { ...values } })
      .then(({ data: { authenticate: { jwtToken } } }) => {
        if (jwtToken) {
          const auth = { credentials: { 'access-token': jwtToken } }
          dispatch(createAction(authType.LOGIN_SUCCESS, auth))
          window.localStorage.setItem('auth', JSON.stringify(auth))
          props.history.push(paths.communityList())
        } else {
          dispatch(createAction(
            authType.LOGIN_FAILURE,
            props.intl.formatMessage({
              id: 'page--account-login.auth.error-message',
              defaultMessage: 'Senha incorreta.'
            })
          ))
        }
      })
  },
  resetErrorMessage: () => createAction(authType.LOGIN_FAILURE, undefined)
})

const FormLoginWithMutation = injectIntl(graphql(authenticate)(reduxForm(
  { form: 'loginForm', fields, validate },
  mapStateToProps,
  mapActionsToProps
)(FormLogin)))

export default FormLoginWithMutation
