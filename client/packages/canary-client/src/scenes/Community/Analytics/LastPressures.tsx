import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalActivistsPressureLast90Days = gql`
  query ($communityId: Int!) {
    count: totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "activist_pressure"
      timeinterval: { days: 90 }
    )
  }
`;

type Props = {
  communityId: number
  children: any
}

const LastPressures = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(totalActivistsPressureLast90Days, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.count });
}

export default LastPressures;