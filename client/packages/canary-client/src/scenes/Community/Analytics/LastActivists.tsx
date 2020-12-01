import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const last90ActivistsQuery = gql`
  query ($communityId: Int!) {
    count: totalUniqueActivistsByCommunityInterval(
      comId: $communityId
      timeinterval: { days: 90 }
    )
  }
`;

type Props = {
  communityId: number
  children: any
}

const LastActivists = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(last90ActivistsQuery, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.count });
}

export default LastActivists;