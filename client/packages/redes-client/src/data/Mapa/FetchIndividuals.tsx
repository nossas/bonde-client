import React from "react";
import { gql } from "bonde-core-tools";
import { CheckCommunity, FetchDataFromGraphql } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues, groupToOrganization } from "../../services/utils";
import { MAPA_TICKET_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";

const INDIVIDUALS_BY_GROUP = gql`
  query Individuals(
    $rows: Int!
    $offset: Int!
    $order_by: [solidarity_tickets_order_by!]
    $userStatus: String_comparison_exp
    $relationshipStatus: String_comparison_exp
    $state: String_comparison_exp
    $availability: String_comparison_exp
    $individualId: bigint_comparison_exp
    $query: String
  ) {
    data: solidarity_tickets(
      where: {
        status_inscricao: $userStatus
        status_acolhimento: $relationshipStatus
        individual: {
          condition: $availability
          state: $state
          organization_id: $individualId
          _or: [
            { name: { _ilike: $query } }
            { email: { _ilike: $query } }
            { occupation_area: { _ilike: $query } }
          ]
        }
      }
      limit: $rows
      offset: $offset
      order_by: $order_by
    ) {
      ...ticketIndividual
    }
    individualsCount: solidarity_tickets_aggregate(
      where: {
        status_inscricao: $userStatus
        status_acolhimento: $relationshipStatus
        individual: {
          condition: $availability
          state: $state
          organization_id: $individualId
          _or: [
            { name: { _ilike: $query } }
            { email: { _ilike: $query } }
            { occupation_area: { _ilike: $query } }
          ]
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${MAPA_TICKET_INDIVIDUAL}
`;

const FetchIndividuals = (props: any = {}) => {
  const { individuals, rows, offset, selectedGroup } = useFilterState();

  const {
    userStatus,
    availability,
    state,
    query,
    relationshipStatus,
  } = getSelectValues(individuals);

  const variables = {
    userStatus: {
      _eq: userStatus,
    },
    relationshipStatus: {
      _eq: relationshipStatus,
    },
    availability: {
      _eq: availability,
    },
    state: {
      _eq: state,
    },
    query: `%${query || ""}%`,
    individualId: {
      _eq: selectedGroup && groupToOrganization[selectedGroup.value as number],
    },
    rows,
    offset,
    // created_at: {
    //   _eq: created_at,
    // };
  };

  return (
    <FetchDataFromGraphql
      variables={variables}
      query={INDIVIDUALS_BY_GROUP}
      {...props}
    />
  );
};

FetchIndividuals.displayName = "FetchIndividuals";

// eslint-disable-next-line react/display-name
export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchIndividuals} {...props} />;
}
