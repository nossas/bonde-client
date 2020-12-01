import React from 'react';
// import styled from 'styled-components';
import {
  Modal,
  Header,
  Text,
  Button,
  Link,
  ConnectedForm,
  InputField,
  toast,
  Success,
  useField,
  Validators
} from 'bonde-components';
import { useMutation, gql } from 'bonde-core-tools';
import { Container, Row, Col } from 'react-grid-system';
import SelectField from '../../../../components/SelectField';
import { InputGroup, Addon } from '../InputGroup';
import { DNSHostedZone } from '../types';

const createRecordGQL = gql`
  mutation ($input: RecordInput) {
    create_record(input: $input)
  }
`;

type Props = {
  open: boolean
  onClose: any
  refetch: any
  dnsHostedZone: DNSHostedZone
}

const ValueRecordTypeField = (props: any) => {
  const typeField = useField('record_type');
  const placeholders: any = { A: '192.0.0.1', CNAME: 'domain.example.org' };
  return (
    <InputField
      {...props}
      placeholder={placeholders[typeField.input.value] || props.placeholder}
    />
  );
}

const TTLRecordTypeField = (props: any) => {
  const typeField = useField('record_type');
  return (
    <InputField
      {...props}
      defaultValue={typeField.input.value === 'A' ? 300 : 3600}
    />
  );
}

const NameField = ({ domainName, name, ...props }: any) => {
  // const { input } = useField(name);

  return (
    <InputGroup>
      <InputField
        {...props}
        name={name}
      />
      <Addon>{`.${domainName}`}</Addon>
    </InputGroup>
  );
}

const { required } = Validators;

const RecordModal = ({ dnsHostedZone, open, onClose, refetch }: Props) => {
  const [createRecord] = useMutation(createRecordGQL);

  return (
    <Modal width='50%' isOpen={open} onClose={onClose}>
      <ConnectedForm
        initialValues={{
          record_type: 'A',
          community_id: dnsHostedZone.community.id,
          dns_hosted_zone_id: dnsHostedZone.id,
          hosted_zone_id: dnsHostedZone.hosted_zone.Id || dnsHostedZone.hosted_zone.id
        }}
        onSubmit={async ({ ttl, value, record_type, name, ...values }: any) => {
          try {
            const variables = {
              input: {
                ...values,
                name: `${name}.${dnsHostedZone.domain_name}`,
                record_type,
                value: record_type !== 'MX' ? value : value.split(/\. /).map((v: string) => `${v.replace(/\.$/, '')}.`),
                ttl: Number(ttl)
              }
            }
            await createRecord({ variables });
            toast(<Success message='Registro adicionado com success' />, { type: toast.TYPE.SUCCESS });
            onClose();
            refetch();
          } catch (err) {
            toast(err, { type: toast.TYPE.ERROR });
          }
        }}
      >
        {({ submitting }) => (
        <Container fluid style={{ width: '100%', padding: '0' }}>
          <Row style={{ marginBottom: '24px' }}>
            <Col xs={12}>
              <Header.H2>Adicionar registro</Header.H2>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={12}>
              <Text>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, clique aqui pra saber mais.</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={12}>
              <NameField
                name='name'
                type='text'
                label='Nome'
                domainName={dnsHostedZone.domain_name}
                validate={required('Nome deve ser preenchido')}
              />
            </Col>
            <Col xs={3}>
              <SelectField
                name='record_type'
                label='Tipo'
              >
                <option value='A'>A</option>
                <option value='CNAME'>CNAME</option>
                <option value='MX'>MX</option>
                <option value='TXT'>TXT</option>
                <option value='AAA'>AAA</option>
              </SelectField>
            </Col>
            <Col xs={6}>
              <ValueRecordTypeField
                name='value'
                type='text'
                label='Valor'
                validate={required('Valor deve ser preenchido')}
              />
            </Col>
            <Col xs={3}>
              <TTLRecordTypeField
                name='ttl'
                type='number'
                label='TTL'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Link onClick={onClose}>Cancelar</Link>
            </Col>
            <Col xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' disabled={submitting}>Continuar</Button>
            </Col>
          </Row>
        </Container>
        )}
      </ ConnectedForm>
    </Modal>
  );
}

export default RecordModal;
