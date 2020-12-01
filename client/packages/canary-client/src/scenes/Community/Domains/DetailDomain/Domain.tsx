import React from 'react';
import { Text, Icon, toast, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { useHistory } from 'react-router-dom';
import {
  DNS as DTRow,
  Col as DTCol,
  Status,
  List as DTList,
  MainTitle,
  Button
} from '../Styles';
import { DNSHostedZone } from '../types';

// Types
type Record = {
  data: string
  name: string
}

type CheckDNS = {
  Answer?: Record[]
}

type Props = {
  refetch: any
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
  action: any
  push?: any
}

// Actions
const handleCheckDNS = ({ dnsHostedZone, refetch, action }: Props) => async () => {
  try {
    const result = await fetch(`https://dns.google.com/resolve?name=${dnsHostedZone.domain_name}&type=NS`);
    const dns: CheckDNS = await result.json();
    const nsOK: boolean = dns.Answer ? dns.Answer.reduce(
      (acc: boolean, el: Record) => acc
        ? !!(dnsHostedZone.name_servers.find((ns: string) => el.data.replace(/[.]$/, '') === ns))
        : false,
      true
    ) : false;

    if (nsOK) {
      if (dnsHostedZone.status === 'propagating' || dnsHostedZone.status === 'created' || !dnsHostedZone.ns_ok) {
        // Change domain to propagated only required change status
        await action({ variables: { dns_hosted_zone_id: dnsHostedZone.id, status: 'propagated' } });
        refetch();
      }
      toast(<Success message='DNS propagado com sucesso.' />, { type: toast.TYPE.SUCCESS });
    } else {
      if ((dnsHostedZone.status !== 'propagating' && dnsHostedZone.status !== 'created') || dnsHostedZone.ns_ok) {
        // Change domain to created only required change status
        await action({ variables: { dns_hosted_zone_id: dnsHostedZone.id, status: 'created' } });
        toast('Verifique se o seu dominio foi configurado corretamente.', { type: toast.TYPE.INFO });
        refetch();
      } else {
        toast('DNS ainda não foi propagado, tente novamente mais tarde.', { type: toast.TYPE.INFO });
      }
    }
  } catch (err) {
    console.log('err', err);
    toast('Houve um problema ao tentar checar DNS', { type: toast.TYPE.ERROR });
  }
}

const handleDelete = ({ dnsHostedZone, action, refetch, push }: Props) => async () => {
  try {
    const input = {
      dns_hosted_zone_id: dnsHostedZone.id,
      community_id: dnsHostedZone.community.id
    };
    await action({ variables: { input } });

    toast(<Success message='Dominio removido com sucesso.' />, { type: toast.TYPE.SUCCESS });
    refetch();

    // Redirect
    push && push('/community/domains');
  } catch (err) {
    console.log('err', err);
    toast('Houve um problema ao tentar remover domínio', { type: toast.TYPE.ERROR });
  }
}

// Component
const deleteDomainGQL = gql`
  mutation ($input: DeleteDomainInput) {
    delete_domain(input: $input)
  }
`;

const updateDomainGQL = gql`
  mutation ($dns_hosted_zone_id: Int!, $status: dnshostedzonestatus!) {
    update_dns_hosted_zones_by_pk(
      pk_columns: { id: $dns_hosted_zone_id },
      _set: { status: $status }
    ) {
      id
      domain_name
      community_id
      status
    }
  }
`

const Domain = (props: Omit<Props, 'action'>) => {
  const [deleteDomain] = useMutation(deleteDomainGQL);
  const [updateDomain] = useMutation(updateDomainGQL);
  const { push } = useHistory();

  return (
    <DTList columnSize='500px auto 280px'>
      <DTRow header>
        <DTCol>
          <MainTitle>Domínio</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Status</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Ações</MainTitle>
        </DTCol>
      </DTRow>
      <DTRow>
        <DTCol>
          <Text bold>{props.dnsHostedZone?.domain_name}</Text>
        </DTCol>
        <DTCol>
          <Status
            value={props.dnsIsActivated ? 'active' : 'inactive'}
            labels={{ 'active': 'Ativo', 'inactive': 'Inativo' }}
          />
        </DTCol>
        <DTCol style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onClick={handleCheckDNS({ ...props, action: updateDomain })} style={{ fontSize: '13px' }}>
            <Icon size='small' name='Sync' /> Verificar DNS
          </Button>
          <Button onClick={handleDelete({ ...props, action: deleteDomain, push })} style={{ fontSize: '13px' }}>
            <Icon size='small' name='Trash' /> Excluir
          </Button>
        </DTCol>
      </DTRow>
    </DTList>
  );
}

export default Domain;