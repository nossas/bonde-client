import gql from 'graphql-tag'

export default gql`
mutation RequestForgetPassword ($email: String!, $callbackUrl: String!, $locale: String) {
  resetPasswordTokenRequest (input: {
    email: $email,
    callbackUrl: $callbackUrl,
    locale: $locale
  }) {
    clientMutationId
  }
}
`
