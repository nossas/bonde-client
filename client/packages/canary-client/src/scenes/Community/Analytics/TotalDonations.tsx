import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalDonationsQuery = gql`
  query ($communityId: Int!) {
    total: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "paid"
    )
    waiting: totalSumDonationsFromCommunity(
      comId: $communityId
      status: "waiting_payment"
    )
  }
`;

type Props = {
  communityId: number
  children: any
}

const TotalDonations = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(totalDonationsQuery, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.total, waiting: data.waiting });
}

export default TotalDonations;