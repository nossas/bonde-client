import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { browserHistory } from 'react-router'

import { createAction } from '~client/utils/redux'
import { isValidEmail } from '~client/utils/validation-helper'

import AccountSelectors from '~client/account/redux/selectors'
import authenticate from '~client/account/queries/authenticate'
import * as authType from '~client/account/redux/action-types'


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

const mapActionsToProps = (dispatch, props) => ({...props,
  login: values => {
    props.mutate({ variables: { ...values } })
      .then(({ data: { authenticate: { jwtToken } } }) => {
        if (jwtToken) {
          dispatch(createAction(
            authType.LOGIN_SUCCESS,
            { credentials: { 'access-token': jwtToken } }
          ))
          browserHistory.push('/')
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
  resetErrorMessage: () => createAction(authType.LOGIN_FAILURE, undefined),
})

const FormLoginWithMutation = injectIntl(graphql(authenticate)(reduxForm(
  { form: 'loginForm', fields, validate },
  mapStateToProps,
  mapActionsToProps
)(FormLogin)))

export default FormLoginWithMutation
