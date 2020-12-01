import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalSubscriptionDonationsAmountLastMonth = gql`
  query ($communityId: Int!) {
    count: totalSumSubscriptionDonationsFromCommunityInterval(
      comId: $communityId
      status: "paid"
      timeinterval: { months: 1 }
    )
  }
`;

type Props = {
  communityId: number
  children: any
}

const SubscriptionDonationsLastMonth = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(totalSubscriptionDonationsAmountLastMonth, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.count });
}

export default SubscriptionDonationsLastMonth;