import gql from 'graphql-tag'

export default gql`
  fragment UserCommunities on Query {
    userCommunities {
      edges {
        node {
          id,
          name,
          city
        }
      }
    }
  }
`
