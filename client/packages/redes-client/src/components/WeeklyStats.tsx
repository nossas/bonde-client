import React from "react";
import { Link } from "react-router-dom";
import { Header, Text } from "bonde-components";

import { StatsCard } from "./";
import { MAPA_DO_ACOLHIMENTO_COMMUNITY } from "../services/utils";
import { WeeklyStatsData } from "../types";

type Props = {
  FetchWeeklyStats: ({
    children,
  }: {
    children: (
      data: WeeklyStatsData & { communityId: number }
    ) => React.ReactElement;
  }) => React.ReactElement | null;
  FilterOptions: {
    [x: string]: { label: string; value: string | number }[];
  };
  volunteerGroup?: {
    name: string;
    id: number;
    isVolunteer: boolean;
  };
  individualGroup?: {
    name: string;
    id: number;
    isVolunteer: boolean;
  };
  dispatch: (arg0: any) => void;
};

export default function WeeklyStats({
  FetchWeeklyStats,
  FilterOptions,
  volunteerGroup,
  individualGroup,
  dispatch,
}: Props): React.ReactElement {
  const getOption = (status: string, field: string) =>
    FilterOptions[field].find((i) => i.label === status);

  return (
    <FetchWeeklyStats>
      {({
        newRecipients,
        encaminhamentosRealizados,
        encaminhamentosServicoPublico,
        atendimentosIniciados,
        newlyApprovedVolunteers,
        newlyAvailableVolunteers,
        communityId,
      }) => (
        <>
          <Link to="/pessoas">
            <StatsCard
              onClick={() => {
                dispatch({
                  type: "group",
                  value: {
                    label: individualGroup?.name || "",
                    value: individualGroup?.id || 0,
                  },
                });
                return dispatch({
                  type: "individuals",
                  value:
                    communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY
                      ? {
                          availability: getOption(
                            "MSR-Inscrita",
                            "availability"
                          ),
                        }
                      : { userStatus: getOption("Inscrita", "userStatus") },
                });
              }}
            >
              <Header.H2>{newRecipients.aggregate.count}</Header.H2>
              <Text>{`Novas(os) ${individualGroup?.name} inscritas(os)`}</Text>
            </StatsCard>
          </Link>
          <Link to="/matches">
            <StatsCard
              onClick={() =>
                dispatch({
                  type: "relationships",
                  value: {
                    relationshipStatus: getOption(
                      "Encaminhamento: Realizado",
                      "relationshipStatus"
                    ),
                  },
                })
              }
            >
              <Header.H2>{encaminhamentosRealizados.aggregate.count}</Header.H2>
              <Text>Encaminhamentos Realizados</Text>
            </StatsCard>
          </Link>
          {communityId === MAPA_DO_ACOLHIMENTO_COMMUNITY && (
            <Link to="/matches">
              <StatsCard
                onClick={() =>
                  dispatch({
                    type: "relationships",
                    value: {
                      relationshipStatus: getOption(
                        "Encaminhamento: Realizado para Serviço Público",
                        "relationshipStatus"
                      ),
                    },
                  })
                }
              >
                <Header.H2>
                  {encaminhamentosServicoPublico.aggregate.count}
                </Header.H2>
                <Text>Encaminhamentos para Serviço Público</Text>
              </StatsCard>
            </Link>
          )}
          <Link to="/matches">
            <StatsCard
              onClick={() =>
                dispatch({
                  type: "relationships",
                  value: {
                    relationshipStatus: getOption(
                      "Atendimento: Iniciado",
                      "relationshipStatus"
                    ),
                  },
                })
              }
            >
              <Header.H2>{atendimentosIniciados.aggregate.count}</Header.H2>
              <Text>Atendimento Iniciados</Text>
            </StatsCard>
          </Link>
          <Link to="/pessoas">
            <StatsCard
              onClick={() => {
                dispatch({
                  type: "group",
                  value: {
                    label: volunteerGroup?.name || "",
                    value: volunteerGroup?.id || 0,
                  },
                });
                return dispatch({
                  type: "individuals",
                  value: {
                    userStatus: getOption("Aprovada", "userStatus"),
                  },
                });
              }}
            >
              <Header.H2>{newlyApprovedVolunteers.aggregate.count}</Header.H2>
              <Text>Novas(os) voluntárias(os) aprovadas(os)</Text>
            </StatsCard>
          </Link>
          <Link to="/pessoas">
            <StatsCard
              onClick={() => {
                dispatch({
                  type: "group",
                  value: {
                    label: volunteerGroup?.name || "",
                    value: volunteerGroup?.id || 0,
                  },
                });
                return dispatch({
                  type: "individuals",
                  value: {
                    userStatus: getOption("Aprovada", "userStatus"),
                    availability: getOption("Disponível", "availability"),
                  },
                });
              }}
            >
              <Header.H2>{newlyAvailableVolunteers.aggregate.count}</Header.H2>
              <Text>Novas(os) voluntárias(os) disponíveis</Text>
            </StatsCard>
          </Link>
        </>
      )}
    </FetchWeeklyStats>
  );
}
