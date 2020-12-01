import React from "react";
import { gql } from "bonde-core-tools";
import { CheckCommunity, FetchDataFromGraphql } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues, getAgentZendeskUserId } from "../../services/utils";
import { MAPA_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";

const MATCHES = gql`
  query Relationships(
    $rows: Int!
    $offset: Int!
    $status: String_comparison_exp
    $state: String_comparison_exp
    $agent: bigint_comparison_exp
    $query: String
    $created_at: timestamp_comparison_exp
  ) {
    relationships: solidarity_matches(
      limit: $rows
      offset: $offset
      order_by: { created_at: desc }
      where: {
        created_at: $created_at
        status: $status
        recipient_ticket: { assignee_id: $agent }
        recipient: { state: $state }
        _or: [
          { recipient: { name: { _ilike: $query } } }
          { recipient: { email: { _ilike: $query } } }
          { volunteer: { name: { _ilike: $query } } }
          { volunteer: { email: { _ilike: $query } } }
        ]
      }
    ) {
      id
      individualsTicketId: individuals_ticket_id
      volunteersTicketId: volunteers_ticket_id
      relationshipStatus: status
      createdAt: created_at
      recipientTicket: recipient_ticket {
        agentId: assignee_id
      }
      volunteer {
        ...individual
      }
      recipient {
        ...individual
      }
    }
    relationshipsCount: solidarity_matches_aggregate(
      where: {
        created_at: $created_at
        status: $status
        recipient_ticket: { assignee_id: $agent }
        recipient: { state: $state }
        _or: [
          { recipient: { name: { _ilike: $query } } }
          { recipient: { email: { _ilike: $query } } }
          { volunteer: { name: { _ilike: $query } } }
          { volunteer: { email: { _ilike: $query } } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${MAPA_INDIVIDUAL}
`;

const FetchMatches = (props: any = {}) => {
  const { relationships, rows, offset } = useFilterState();

  const { relationshipStatus, state, query, agent } = getSelectValues(
    relationships
  );

  const variables = {
    status: {
      _eq: relationshipStatus,
    },
    state: {
      _eq: typeof state === "string" ? state.toLowerCase() : state,
    },
    agent: {
      _eq: getAgentZendeskUserId(agent as number | null),
    },
    query: `%${query || ""}%`,
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  return (
    <FetchDataFromGraphql variables={variables} query={MATCHES} {...props} />
  );
};

FetchMatches.displayName = "FetchMatches";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchMatches} {...props} />;
}
