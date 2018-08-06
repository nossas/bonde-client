import gql from 'graphql-tag'

export default gql`
mutation ResetPassword (
  $newPassword: String!,
  $token: String!
) {
  resetPasswordChangePassword (input: {
    newPassword:$newPassword,
    token:$token
  }) {
    changePasswordField {
      userFirstName,
      token
    }
  }
}`
