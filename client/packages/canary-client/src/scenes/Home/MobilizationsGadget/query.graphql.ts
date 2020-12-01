import { gql } from 'bonde-core-tools';

export default gql`
  query LastMobilizationsUpdated ($userId: Int!) {
    mobilizations(
      limit: 4,
      where: { community: { community_users: { user_id: { _eq: $userId } } } },
      order_by: { updated_at: desc_nulls_last }
    ) {
      id
      name
      goal
      facebook_share_image
      custom_domain
      slug
      updated_at
      community {
        id
        name
        city
      }
    }
  }
`;
