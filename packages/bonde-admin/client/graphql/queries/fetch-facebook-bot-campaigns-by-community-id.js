import { gql } from 'react-apollo'

//
// @param Object({ extraFields: Array })
//
export default gql`
query fetchFacebookBotCampaignsByCommunityId($communityId: Int!) {
  query: getFacebookBotCampaignsByCommunityId(ctxCommunityId: $communityId) {
    campaigns: nodes {
      id
      facebookBotConfigurationId
      name
      segmentFilters
      totalImpactedActivists
      createdAt
      updatedAt
    }
  }
}
`
