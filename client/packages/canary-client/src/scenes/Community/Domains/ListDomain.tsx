import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Text, Icon } from 'bonde-components';
import {
  DNS as DTRow,
  Col as DTCol,
  List as DTList,
  Status,
  Fluid
} from './Styles';
import CreateDomainModal from './CreateDomainModal';

type Certificate = {
  is_active: boolean
}

type DNSHostedZone = {
  id: number
  domain_name: string
  name_servers?: string[]
  ns_ok?: boolean
  certificates?: Certificate[]
  status: 'created' | 'propagating' | 'propagated' | 'certifying' | 'certified'
}

type Props = {
  dnsHostedZone: DNSHostedZone
}

const Domain = ({ dnsHostedZone }: Props) => {
  return (
    <Link to={`/community/domains/${dnsHostedZone.id}`}>
      <DTRow>
        <DTCol>
          <Text bold>{dnsHostedZone.domain_name}</Text>
        </DTCol>
        <DTCol>
          <Status
            activeStatus='propagated'
            inactiveStatus='created'
            value={dnsHostedZone.status === 'propagated' || dnsHostedZone.ns_ok ? 'propagated' : dnsHostedZone.status}
            labels={{
              created: 'Aguardando configurar DNS',
              propagating: 'Propagando',
              propagated: 'Propagado'
            }}
          />
        </DTCol>
        <DTCol>
          <Icon size='small' name='ArrowRight' />
        </DTCol>
      </DTRow>
    </Link>
  );
}

type DomainsProps = {
  refetch: any
  dnsHostedZones: DNSHostedZone[]
}

const Domains = ({ dnsHostedZones, refetch }: DomainsProps) => (
  <>
    <Fluid>
      <div>
        <Header.H3>Domínios</Header.H3>
        <Text>Aqui você gerencia os Domínios (URLs customizadas) das páginas da sua comunidade.</Text>
      </div>
      <CreateDomainModal btnText='Adicionar domínio' refetch={refetch} />
    </Fluid>
    <DTList columnSize='500px auto 70px'>
      <DTRow header>
        <DTCol>
          <Text>Domínio</Text>
        </DTCol>
        <DTCol>
          <Text>Status</Text>
        </DTCol>
        <DTCol />
      </DTRow>
      {dnsHostedZones.map((dnsHostedZone: DNSHostedZone, index: number) => (
        <Domain key={index} dnsHostedZone={dnsHostedZone} />
      ))}
    </DTList>
  </>
);

export default Domains;