/* eslint-disable react/display-name */
import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { CheckCommunity } from "../../components";
import { WeeklyStatsData, RedesWeeklyStatsVars, Groups } from "../../types";

const WEEKLY_DATA = gql`
  query WeeklyData(
    $lastWeek: timestamp_comparison_exp!
    $context: Int_comparison_exp!
    $widgets: Int_comparison_exp!
  ) {
    newRecipients: form_entries_aggregate(
      where: {
        cached_community_id: $context
        widget_id: $widgets
        created_at: $lastWeek
      }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosRealizados: rede_relationships_aggregate(
      where: {
        status: { _eq: "encaminhamento_realizado" }
        created_at: $lastWeek
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: rede_relationships_aggregate(
      where: {
        status: { _eq: "atendimento_iniciado" }
        updated_at: $lastWeek
        recipient: { group: { community_id: $context } }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyApprovedVolunteers: rede_individuals_aggregate(
      where: {
        status: { _eq: "aprovada" }
        updated_at: $lastWeek
        group: { community_id: $context }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyAvailableVolunteers: rede_individuals_aggregate(
      where: {
        availability: { _eq: "disponivel" }
        updated_at: $lastWeek
        group: { community_id: $context }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  children: any;
  weeklyTimestamp: string;
  community: {
    id: number;
  };
  groups: Groups;
};

const FetchWeeklyStats = ({
  children,
  weeklyTimestamp,
  community,
  groups,
}: Props) => {
  const variables = {
    lastWeek: {
      _gte: weeklyTimestamp,
    },
    context: {
      _eq: community.id,
    },
    widgets: {
      _in: groups.map((i) => i.widgetId),
    },
  };

  const { loading, error, data } = useQuery<
    WeeklyStatsData,
    RedesWeeklyStatsVars
  >(WEEKLY_DATA, {
    variables,
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  return children({
    ...data,
    communityId: community.id,
  });
};

export default function (props: any = {}): React.ReactElement {
  return <CheckCommunity Component={FetchWeeklyStats} {...props} />;
}
