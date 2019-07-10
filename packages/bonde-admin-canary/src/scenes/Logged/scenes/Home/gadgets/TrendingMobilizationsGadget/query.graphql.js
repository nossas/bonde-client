import gql from 'graphql-tag'

export default gql`
  query TrendingMobilizations($days: Int) {
    trendingMobilizations(days: $days) {
      edges {
        node {
          id
          name
          goal
          facebookShareImage
          customDomain
          slug
          community {
            name
          }
        }
      }
    }
  }
`
