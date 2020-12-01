import React from "react";
import { Header, Text } from "bonde-components";
import styled from "styled-components";
import { StatsCard } from "./";
import { GeneralStatsData } from "../types";

const DashboardGrid = styled.div`
  border-color: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 400px));
  grid-template-rows: repeat(3, minmax(auto, 300px));
  grid-gap: 20px;
`;

const BlocksGrid = styled.div`
  border-color: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 200px));
  grid-template-rows: repeat(2, 140px);
  grid-gap: 20px;
  & > button {
    width: unset;
    min-width: 100%;
    cursor: default;
  }
`;

type Props = {
  FetchGeneralStats: ({
    children,
  }: {
    children: (data: GeneralStatsData) => React.ReactElement;
  }) => React.ReactElement | null;
};

export default function GeneralStats({
  FetchGeneralStats,
}: Props): React.ReactElement {
  return (
    <DashboardGrid>
      {/* <Question
        config={{ resource: { question: 1187 }, params: {} }} // msr / dia
        title
      />
      <Question
        config={{ resource: { question: 1020 }, params: {} }} // voluntarias / dia
        title
      />
      <Question
        config={{ resource: { question: 1140 }, params: {} }} // match / dia
        title
      />
      <Question
        config={{ resource: { question: 1186 }, params: {} }} // msr serv. pub.
        title
      />
      <Question
        config={{ resource: { question: 1188 }, params: {} }} // total dos acolhimentos
        title
      /> */}
      <FetchGeneralStats>
        {({
          encaminhamentosRealizados,
          atendimentosIniciados,
          atendimentosConcluidos,
          atendimentosInterrompidos,
          aprovadas,
          reprovadasDiretrizes,
          reprovadasEstudoDeCaso,
        }) => (
          <>
            <BlocksGrid>
              <StatsCard>
                <Header.H2>
                  {encaminhamentosRealizados.aggregate.count}
                </Header.H2>
                <Text>Encaminhamentos Realizados</Text>
              </StatsCard>
              <StatsCard>
                <Header.H2>{atendimentosConcluidos.aggregate.count}</Header.H2>
                <Text>Atendimentos Concluídos</Text>
              </StatsCard>
              <StatsCard>
                <Header.H2>{atendimentosIniciados.aggregate.count}</Header.H2>
                <Text>Atendimentos Iniciados</Text>
              </StatsCard>
              <StatsCard>
                <Header.H2>
                  {atendimentosInterrompidos.aggregate.count}
                </Header.H2>
                <Text>Atendimentos Interrompidos</Text>
              </StatsCard>
            </BlocksGrid>
            {/* <Question
              config={{ resource: { question: 1151 }, params: {} }}
              title
            /> */}
            <BlocksGrid>
              <StatsCard>
                <Header.H2>{aprovadas.aggregate.count}</Header.H2>
                <Text>Aprovadas e Validadas</Text>
              </StatsCard>
              {reprovadasDiretrizes && (
                <StatsCard>
                  <Header.H2>{reprovadasDiretrizes.aggregate.count}</Header.H2>
                  <Text>Reprovadas Diretrizes</Text>
                </StatsCard>
              )}
              {reprovadasEstudoDeCaso && (
                <StatsCard>
                  <Header.H2>
                    {reprovadasEstudoDeCaso.aggregate.count}
                  </Header.H2>
                  <Text>Reprovadas Estudo de Caso</Text>
                </StatsCard>
              )}
            </BlocksGrid>
          </>
        )}
      </FetchGeneralStats>
      {/* <Question config={{ resource: { question: 1189 }, params: {} }} title /> */}
    </DashboardGrid>
  );
}
