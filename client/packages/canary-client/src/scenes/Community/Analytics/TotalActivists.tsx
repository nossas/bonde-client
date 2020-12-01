import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalActivistsQuery = gql`
  query ($communityId: Int!) {
    count: totalUniqueActivistsByCommunity(comId: $communityId)
  }
`;

type Props = {
  communityId: number
  children: any
}

const TotalActivists = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(totalActivistsQuery, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.count });
}

export default TotalActivists;