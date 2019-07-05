import gql from 'graphql-tag'

export default gql`
  query User {
    user {
      id
      firstName
      lastName
      email,
      tags {
        edges {
          node {
            id,
            name,
            label
          }
        }
      }
    }
  }
`
