import gql from 'graphql-tag'

export default gql`
  fragment UserMobilizations on Query {
    userMobilizations {
      edges {
        node {
          id,
          name,
          community {
            id,
            name
          }
        }
      }
    }
  }
`
