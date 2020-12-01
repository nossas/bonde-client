import React from 'react';
import { Header, Icon, Text, toast, Success } from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import {
  DNS as DTRow,
  Col as DTCol,
  List as DTList,
  Button,
  MainTitle
} from '../Styles';
import { DNSHostedZone, DNSRecord } from '../types';

const deleteRecordGQL = gql`
  mutation ($input: DeleteRecordsInput) {
    delete_records(input: $input)
  }
`

type Props = {
  dnsHostedZone: DNSHostedZone
  refetch: any
}

const Records = ({ dnsHostedZone, refetch }: Props) => {
  const [deleteRecord] = useMutation(deleteRecordGQL);

  return (
    <DTList
      columnSize='400px 300px auto auto 200px'
      rowSize='auto'
    >
      <DTRow header>
        <DTCol>
          <MainTitle>Registro</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Valor</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>Tipo</MainTitle>
        </DTCol>
        <DTCol>
          <MainTitle>TTL</MainTitle>
        </DTCol>
        <DTCol />
      </DTRow>
      {dnsHostedZone
        .dns_records
        .filter((r: DNSRecord) => r.record_type !== 'NS' && r.record_type !== 'SOA')
        .map((dnsRecord: DNSRecord) => (
          <DTRow key={dnsRecord.name}>
            <DTCol>
              <Header.H5>{dnsRecord.name}</Header.H5>
            </DTCol>
            <DTCol>
              <Text
                style={dnsRecord.record_type === 'TXT'
                  ? { wordBreak: 'break-all' }
                  : { whiteSpace: "break-spaces" }
                }
              >
                {dnsRecord.record_type === 'MX' ? dnsRecord.value.split(/\. /).map((v: string) => `${v.replace(/\.$/, '')}.\n`) : dnsRecord.value}
              </Text>
            </DTCol>
            <DTCol>
              <Text>{dnsRecord.record_type}</Text>
            </DTCol>
            <DTCol>
              <Text>{dnsRecord.ttl}</Text>
            </DTCol>
            <DTCol>
              <Button
                onClick={async () => {
                  try {
                    const input = {
                      dns_hosted_zone_id: dnsHostedZone.id,
                      records: [dnsRecord.id],
                      community_id: dnsHostedZone.community.id
                    };
                    await deleteRecord({ variables: { input } });
                    toast(<Success message='Registro removido com sucesso' />, { type: toast.TYPE.SUCCESS });
                    refetch();
                  } catch (err) {
                    toast(err, { type: toast.TYPE.ERROR });
                  }
                }}
              >
                <Icon name='Trash' size='small' /> Excluir
              </Button>
            </DTCol>
          </DTRow>
        ))
      }
    </DTList>
  );
}

export default Records;