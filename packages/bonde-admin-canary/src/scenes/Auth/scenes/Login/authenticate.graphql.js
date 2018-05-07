import gql from 'graphql-tag'

export default gql`
  mutation authenticate($email: String!, $password: String!){
    authenticate(input: {              
      email: $email
      password: $password
    }) {
      jwtToken
    }
  }
`
