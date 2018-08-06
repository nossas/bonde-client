import gql from 'graphql-tag'

export default gql`
query TokenVerify ($token: String!) {
  resetPasswordTokenVerify (token: $token)
}
`
