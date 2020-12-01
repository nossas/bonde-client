import React, { useState } from 'react';
import { useMutation, gql } from 'bonde-core-tools';
import { Link, Button, toast, Success } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';
import { DNSHostedZone } from '../types';
import NameServersForm from './NameServersForm';
import IPConnectForm from './IPConnectForm';

const propagatingDNSGQL = gql`
  mutation ($dns_hosted_zone_id: Int!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: { status: "propagating" }
    ) {
      id
      domain_name
      community_id
      status
    }
  }
`;

type Props = {
  onClose: any;
  dnsHostedZone: DNSHostedZone
}

const ConnectDNS = ({ dnsHostedZone, onClose }: Props) => {
  const [status, setStatus] = useState();
  const [isNameServers, setIsNameServers] = useState(true);
  const [setPropagating] = useMutation(propagatingDNSGQL);

  const changeStatus = (e: any) => setStatus(e.target.value);
  const connectByIP = () => setIsNameServers(false);

  const done = async () => {
    await setPropagating({ variables: { dns_hosted_zone_id: dnsHostedZone.id } });
    // const { data, errors } = await setPropagating({ variables: { dns_hosted_zone_id: dnsHostedZone.id } });
    // console.log('data, errors', { data, errors });
    toast(<Success message='Dominio salvo com sucesso!' />, { type: toast.TYPE.SUCCESS });
    onClose()
  }

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      {isNameServers
        ? <NameServersForm status={status} changeStatus={changeStatus} connectByIP={connectByIP} dnsHostedZone={dnsHostedZone} />
        : <IPConnectForm status={status} changeStatus={changeStatus} />
      }
      <Row>
        <Col xs={6}>
          <Link onClick={onClose}>Voltar</Link>
        </Col>
        <Col xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={done} disabled={status !== 'registered'} type='button'>
            Pronto!
        </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ConnectDNS;