import React from 'react'
import { I18n } from 'react-i18next'
import { Query } from 'react-apollo'
import { AuthAPI } from 'services/auth'
import { notify } from 'components/Notification'

import tokenVerify from './tokenVerify.graphql'
import CheckingToken from './CheckingToken'
import InvalidToken from './InvalidToken'
import ResetPasswordForm from './ResetPasswordForm'
import PropTypes from 'prop-types'

const ResetPassword = ({ match }) => (
  <I18n ns='auth'>
    {t => {
      const token = match.params.token

      return (
        <Query query={tokenVerify} variables={{ token }}>
          {({ loading, error }) => {
            if (loading) return <CheckingToken t={t} />

            if (error) return <InvalidToken t={t} />

            return (
              <ResetPasswordForm
                t={t}
                token={token}
                handleSuccess={({ data }) => {
                  const { changePasswordField } = data.resetPasswordChangePassword
                  const user = { name: changePasswordField.userFirstName }

                  AuthAPI.login({
                    jwtToken: changePasswordField.token
                  })
                    .then(() => {
                      notify(t('resetPassword.success', { user }))
                      // should redirect with window to rehydrate session
                      window.location.href = '/'
                    })
                }}
              />
            )
          }}
        </Query>
      )
    }}
  </I18n>
)

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  })
}

export default ResetPassword
