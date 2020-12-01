import React from "react";
import { gql } from "bonde-core-tools";
import { CheckCommunity, FetchDataFromGraphql } from "../../components";
import { useFilterState } from "../../services/FilterProvider";
import { getSelectValues } from "../../services/utils";
import { REDE_INDIVIDUAL } from "../../graphql/IndividualFragment.graphql";

export const INDIVIDUALS_BY_GROUP = gql`
  query Individuals(
    $rows: Int!
    $offset: Int!
    $context: Int_comparison_exp!
    $userStatus: String_comparison_exp
    $state: String_comparison_exp
    $availability: String_comparison_exp
    $redeGroupId: Int_comparison_exp
    $query: String
  ) {
    data: rede_individuals(
      where: {
        status: $userStatus
        availability: $availability
        state: $state
        rede_group_id: $redeGroupId
        _or: [
          { first_name: { _ilike: $query } }
          { last_name: { _ilike: $query } }
          { email: { _ilike: $query } }
        ]
        group: {
          community_id: $context
        }
      }
      limit: $rows
      offset: $offset
      order_by: { created_at: asc }
    ) {
      ...individual
    }
    individualsCount: rede_individuals_aggregate(
      where: {
        status: $userStatus
        availability: $availability
        state: $state
        rede_group_id: $redeGroupId
        _or: [
          { first_name: { _ilike: $query } }
          { last_name: { _ilike: $query } }
          { email: { _ilike: $query } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${REDE_INDIVIDUAL}
`;

const FetchIndividuals = (props: any = {}) => {
  const { individuals, rows, offset, selectedGroup } = useFilterState();

  const { userStatus, availability, state, query } = getSelectValues(
    individuals
  );

  const variables = {
    userStatus: {
      _eq: userStatus,
    },
    availability: {
      _eq: availability,
    },
    state: {
      _eq: typeof state === "string" ? state.toUpperCase() : state,
    },
    query: `%${query || ""}%`,
    redeGroupId: {
      _eq: selectedGroup && selectedGroup.value,
    },
    rows,
    offset,
    context: {
      _eq: props.community && props.community.id
    }
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
