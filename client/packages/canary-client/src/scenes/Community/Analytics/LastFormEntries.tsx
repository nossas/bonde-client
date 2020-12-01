import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalActivistsFormEntryLast90Days = gql`
  query ($communityId: Int!) {
    count: totalUniqActivistsByKindAndCommunityInterval(
      comId: $communityId
      kindName: "form_entry"
      timeinterval: { days: 90 }
    )
  }
`;

type Props = {
  communityId: number
  children: any
}

const LastFormEntries = ({ communityId, children }: Props) => {
  const { data, loading, error } = useQuery(totalActivistsFormEntryLast90Days, { variables: { communityId } });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.count });
}

export default LastFormEntries;