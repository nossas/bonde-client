//
// @route /register
//
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { gql, graphql } from 'react-apollo'
import queryString from 'query-string'

import { isValidEmail } from 'utils/validation-helper'
import crossStorage from 'cross-storage-client'
import Page from './page'

const fields = [
  'first_name',
  'last_name',
  'email',
  'password',
  'password2',
  'invitation_code'
]

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

const CheckInvitationQuery = gql`
query checkInvitation ($invitationCode: String!) {
  checkInvitation (invitationCode: $invitationCode) {
    nodes {
      email
    }
  }
}`

const RegisterWithData = graphql(CheckInvitationQuery, {
  skip: (ownProps) => !queryString.parse(ownProps.location.search).invitation_code,
  options: (ownProps) => {
    const params = queryString.parse(ownProps.location.search)
    return {
      variables: { invitationCode: params.invitation_code }
    }
  },
  props: ({ ownProps, data: { loading, checkInvitation } }) => {
    const email = checkInvitation && checkInvitation.nodes && checkInvitation.nodes[0].email

    if (!email && !loading) {
      // Throw error when email is undefined before loading
      throw Error('invitation_code is invalid, invite not found.')
    }

    const params = queryString.parse(ownProps.location.search)
    return {
      checkInvitationLoading: loading,
      initialValues: {
        email,
        invitation_code: params.invitation_code
      }
    }
  }
})

const RegisterMutation = gql`
mutation register ($user: RegisterInput!) {
  register (input: $user) {
    jwtToken
  }
}
`

const mapActionsToProps = (dispatch, ownProps) => ({
  submit: ({ password2, ...user }) => {
    ownProps.mutate({
      variables: {
        user: {
          data: JSON.stringify(user)
        }
      }
    })
    .then(({ data }) => {
      if (data.register.jwtToken) {
        // resolver redirect
        crossStorage
          .onConnect()
          .then(() => {
            const user = { jwtToken: data.register.jwtToken }
            return crossStorage
              .set('auth', JSON.stringify(user))
              .then(() => {
                const adminCanaryUrl = (
                  process.env.REACT_APP_DOMAIN_ADMIN_CANARY || 'http://admin-canary.bonde.devel:5002'
                )
                window.location.href = adminCanaryUrl
              })
          })
      } else {
        console.log('error graphql register', 'jwtToken is null')
      }
    })
    .catch(error => {
      console.log('error graphql register', error)
    })
  }
})

export default injectIntl(
  graphql(RegisterMutation)(
    connect(undefined, mapActionsToProps)(
      RegisterWithData(
        reduxForm({ form: 'registerForm', fields, validate })(Page)
      )
    )
  )
)