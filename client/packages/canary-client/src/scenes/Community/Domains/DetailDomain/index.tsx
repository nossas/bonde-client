import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useParams, Redirect } from 'react-router-dom';
import NameServers from '../NameServers';
import { DNSHostedZone } from '../types';
// Scene components
import Navigation from './Navigation';
import Domain from './Domain';
import Explain from './Explain';
import Records from './Records';

type Props = {
  refetch: any
  dnsHostedZones: DNSHostedZone[]
}

const DetailDomain = ({ dnsHostedZones, refetch }: Props) => {
  const { hostedZoneId } = useParams();
  const dnsHostedZone = dnsHostedZones.filter((hZ: any) => hZ.id === Number(hostedZoneId))[0];

  if (!dnsHostedZone) return <Redirect to='/community/domains' />

  const dnsIsActivated = !!(
    (dnsHostedZone.status !== 'created' && dnsHostedZone.status !== 'propagating' )
      || dnsHostedZone.ns_ok
  );

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Navigation dnsHostedZone={dnsHostedZone} refetch={refetch} />
      <Row>
        <Col xs={12}>
          <Domain
            refetch={refetch}
            dnsHostedZone={dnsHostedZone}
            dnsIsActivated={dnsIsActivated}
          />
        </Col>
        <Col xs={12}>
          <Explain
            dnsHostedZone={dnsHostedZone}
            dnsIsActivated={dnsIsActivated}
          />
        </Col>
        {(dnsIsActivated) && (
          <Col xs={12}>
            <Records dnsHostedZone={dnsHostedZone} refetch={refetch} />
          </Col>
        )}
        <Col xs={12}>
          <NameServers dnsHostedZone={dnsHostedZone} />
        </Col>
      </Row>
    </Container>
  )
}

export default DetailDomain;