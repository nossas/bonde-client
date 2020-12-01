import React from 'react';
import { useSession } from 'bonde-core-tools';
import { Header, Icon, Text, Tooltip, Message, Hint } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import TotalActivists from './TotalActivists';
import LastActivists from './LastActivists';
import LastPressures from './LastPressures';
import LastFormEntries from './LastFormEntries';
import SubscriptionDonationsLastMonth from './SubscriptionDonationsLastMonth';
import UniqueDonationsLastMonth from './UniqueDonationsLastMonth';
import TotalDonations from './TotalDonations';
import Panel from '../Panel';
import DownloadCSV from './DownloadCSV';

type StylesProps = {
  full?: boolean
}

const Styles = styled.div<StylesProps>`
  ${Panel} {
    min-height: ${props => props.full ? '254px' : '97px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 30px;
  }

  ${Hint} {
    word-break: break-word;
  }
`

type PositionProps = {
  direction?: 'right' | 'left'
}

const Position = styled.div<PositionProps>`
  ${Message} {
    ${props => props.direction === 'right' ? 'right: -20px' : 'left: -20px'};
  }
`
Position.defaultProps = {
  direction: 'left'
}

const AnalyticsCard = ({ label, tooltip, children, full, direction }: any) => {
  const Label = <Header.H5 style={{ fontWeight: 600, marginBottom: '12px' }} uppercase>{label}</Header.H5>;
  return (
    <Styles full={full}>
      {tooltip ? (
        <Position direction={direction}>
          <Tooltip
            label={Label}
            info={tooltip}
          />
        </Position>
      ) : Label}
      <Panel>
        {children}
      </Panel>
    </Styles>
  );
}

type NumberProps = {
  query: any
  children?: any
  format: 'default' | 'money'
}

const Number = ({ query: Query, children, format }: NumberProps) => {
  const { community } = useSession();

  return (
    <Query communityId={community?.id || 0}>
      {({ total, waiting }: any) => (
        <>
          <Header.H2>{format === 'money' ? `${total},00` : total}</Header.H2>
          {waiting && (
            <Text style={{ color: '#a4a4a4' }}>
              <Icon color='#c7c7c7' name='Sync' size='small' />
              <span>{format === 'money' ? `${waiting},00` : waiting}</span>
            </Text>
          )}
          {children}
        </>
      )}
    </Query>
  );
}

Number.defaultProps = {
  format: 'default'
}

const Analytics = () => (
  <Container fluid style={{ width: "100%", padding: "0" }}>
    <Row>
      <Col xs={12}>
        <Header.H5 style={{ fontWeight: 600, marginBottom: '12px' }} uppercase>Baixar relatórios</Header.H5>
      </Col>
      <Col xs={12}>
        <DownloadCSV
          label='Relatórios de doações'
          icon='Ticket'
          path='donation_reports'
        />
        <DownloadCSV
          label='Doações recorrentes'
          icon='TicketRecurring'
          path='download_subscriptions'
        />
        <DownloadCSV
          label='Relatórios de ações'
          icon='Bolt'
          path='activist_actions'
        />
        <DownloadCSV
          label='Relatórios de ativistas'
          icon='Network'
          path='activists'
        />
      </Col>
    </Row>
    <Row>
      <Col xs={5}>
        <Row>
          <Col xs={6}>
            <AnalyticsCard
              label='Ativistas'
              tooltip='Total de pessoas que já agiram em alguma página publicada pela sua comunidade.'
            >
              <Number query={TotalActivists} />
            </AnalyticsCard>
          </Col>
          <Col xs={6}>
            <AnalyticsCard
              label='Ativistas recentes'
              tooltip='Total de pessoas que agiram na sua comunidade nos últimos 90 dias.'
            >
              <Number query={LastActivists} />
            </AnalyticsCard>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <AnalyticsCard
              label='Pressões recentes'
              tooltip='Total de ações de pressão feitas em páginas da sua comunidade nos últimos 90 dias.'
            >
              <Number query={LastPressures} />
            </AnalyticsCard>
          </Col>
          <Col xs={6}>
            <AnalyticsCard
              label='Inscrições recentes'
              tooltip='Total de ações de formulários publicados pela sua comunidade nos últimos 90 dias.'
            >
              <Number query={LastFormEntries} />
            </AnalyticsCard>
          </Col>
        </Row>
      </Col>
      <Col xs={7}>
        <Row>
          <Col xs={4}>
            <AnalyticsCard
              full
              label='Doações únicas (R$)'
              tooltip='Valor total das doações únicas confirmadas na comunidade nos últimos 30 dias.'
            >
              <Number query={SubscriptionDonationsLastMonth} format='money'>
                <Text>Nos últimos 30 dias</Text>
              </Number>
            </AnalyticsCard>
          </Col>
          <Col xs={4}>
            <AnalyticsCard
              full
              label='Doações recorrentes (R$)'
              tooltip='Valor total das doações recorrentes confirmadas na comunidade nos últimos 30 dias.'
            >
              <Number query={UniqueDonationsLastMonth} format='money'>
                <Text>Nos últimos 30 dias</Text>
              </Number>
            </AnalyticsCard>
          </Col>
          <Col xs={4}>
            <AnalyticsCard
              full
              label='Total arrecadado (R$)'
              tooltip='Valor total de doações únicas e recorrentes arrecadadas pela comunidade até agora.'
              direction='right'
            >
              <Number query={TotalDonations} format='money'>
                <Text>(Confirmadas / Aguardando pagamento)</Text>
              </Number>
            </AnalyticsCard>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Analytics;