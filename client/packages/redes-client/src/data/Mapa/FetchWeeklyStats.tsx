/* eslint-disable react/display-name */
import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Spinner } from "bonde-components"
import { CheckCommunity } from "../../components";
import { zendeskOrganizations } from "../../services/utils";
import { WeeklyStatsData, MapaWeeklyStatsVars } from "../../types";

const WEEKLY_DATA = gql`
  query WeeklyData(
    $lastWeek: timestamp_comparison_exp
    $individualOrganizationId: bigint
  ) {
    newRecipients: form_entries_aggregate(
      where: { widget_id: { _in: [3297, 16850, 62625] }, created_at: $lastWeek }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosRealizados: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: { _eq: "encaminhamento__realizado" }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    encaminhamentosServicoPublico: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: {
          _eq: "encaminhamento__realizado_para_serviço_público"
        }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    atendimentosIniciados: solidarity_tickets_aggregate(
      where: {
        status_acolhimento: { _eq: "atendimento__iniciado" }
        status: { _nin: ["closed", "solved", "deleted"] }
        updated_at: $lastWeek
        organization_id: { _eq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyApprovedVolunteers: solidarity_users_aggregate(
      where: {
        condition: { _eq: "aprovada" }
        updated_at: $lastWeek
        organization_id: { _neq: $individualOrganizationId }
      }
    ) {
      aggregate {
        count
      }
    }
    newlyAvailableVolunteers: solidarity_users_aggregate(
      where: {
        condition: { _eq: "disponivel" }
        updated_at: $lastWeek
        organization_id: { _neq: $individualOrganizationId }
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
};

const FetchWeeklyStats = ({ children, weeklyTimestamp, community }: Props) => {
  const variables = {
    lastWeek: {
      _gte: weeklyTimestamp,
    },
    individualOrganizationId: zendeskOrganizations["individual"],
  };

  const { loading, error, data } = useQuery<
    WeeklyStatsData,
    MapaWeeklyStatsVars
  >(WEEKLY_DATA, {
    variables,
  });

  if (loading) return <Spinner />;
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