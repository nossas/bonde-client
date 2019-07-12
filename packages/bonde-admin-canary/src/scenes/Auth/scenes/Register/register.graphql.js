import gql from 'graphql-tag'

export default gql`
  mutation createUser ($email: String!, $password: String!, $lastName: String, $firstName: String!){
    createUser(input: {
      email: $email
      password: $password
      lastName: $lastName
      firstName: $firstName
    }) {
      user {
        email
      }
    }
  }
`
