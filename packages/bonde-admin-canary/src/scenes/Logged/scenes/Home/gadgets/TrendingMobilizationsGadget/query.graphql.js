import gql from 'graphql-tag'

export default gql`
  query TrendingMobilizations($days: Int, $limit: Int) {
    trendingMobilizations(days: $days, first: $limit) {
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
