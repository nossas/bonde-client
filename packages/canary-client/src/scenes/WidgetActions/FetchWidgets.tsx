import React from 'react';
import { gql, useQuery } from 'bonde-core-tools';
import { Hint, Loading } from 'bonde-components';

const widgetsByCommunityGQL = gql`
  query FetchWidgets ($communityId: Int!) {
    widgets (
      where: {
        _and: [
          { kind: { _neq: "draft" }},
          { kind: { _neq: "content" }},
          {
            block: {
              mobilization: {
                deleted_at: { _is_null: true },
                community_id: { _eq: $communityId }
              }
            }
          }
        ]
      }
    ) {
      id
      kind
      block {
        mobilization {
          image: facebook_share_image
          name
          community_id
        }
      }

      actions: activist_actions_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export type Widget = {
  id: number
  kind: 'pressure' | 'form' | 'donation'
  block: {
    mobilization: {
      image?: string
      name: string
      community_id: number
    }
  }
  actions: {
    aggregate: {
      count: number
    }
  }
}

type RenderProps = {
  widgets: Widget[]
}

type Props = {
  communityId: number
  children: ({ widgets }: RenderProps) => any
}

const FetchWidgets = ({ children, communityId }: Props) => {
  const { data, loading, error } = useQuery<RenderProps>(widgetsByCommunityGQL, { variables: { communityId } });

  if (error) return <Hint color="error">{JSON.stringify(error)}</Hint>;
  if (loading) return <Loading message='Carregando ações...' />;

  return children({ widgets: data?.widgets || [] });
}

export default FetchWidgets;