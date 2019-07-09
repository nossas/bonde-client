import gql from 'graphql-tag'

export default gql`
  query UserCommunities {
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
