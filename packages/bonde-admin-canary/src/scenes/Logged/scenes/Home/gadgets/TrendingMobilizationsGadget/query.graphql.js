import gql from 'graphql-tag'

export default gql`
  query TrendingMobilizations($limit: Int, $days: Int!) {
    trendingMobilizations(first: $limit, days: $days) {
      nodes {
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
`
