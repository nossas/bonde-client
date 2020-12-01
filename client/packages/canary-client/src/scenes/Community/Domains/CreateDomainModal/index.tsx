import React, { useState } from 'react';
import { useMutation, gql, useSession } from 'bonde-core-tools';
import { Button, Modal } from 'bonde-components';
// import { FORM_ERROR } from 'final-form';
import { DNSHostedZone } from '../types';
import DomainForm from './DomainForm';
import ConnectDNS from './ConnectDNS';

const createDomainGQL = gql`
  mutation ($input: DomainInput) {
    create_domain(input: $input) {
      comment
      community_id
      created_at
      domain_name
      id
      name_servers
      ns_ok
      updated_at
    }
  }
`;

const CreateDomainModal = ({ btnText, refetch }: any) => {
  const [open, setOpen] = useState(false);
  const [dnsHostedZone, setDnsHostedZone] = useState<DNSHostedZone>();
  const [createDomain] = useMutation(createDomainGQL);
  const { community, user } = useSession();

  const onSubmit = async ({ value }: any) => {
    try {
      const { data } = await createDomain({
        variables: {
          input: {
            domain: value,
            community_id: community?.id,
            comment: `Created by ${user.firstName}`
          }
        }
      });
      setDnsHostedZone(data.create_domain);
    } catch (err) {
      if (err && err.message === 'domain_name_exists') {
        return { "FINAL_FORM/form-error": 'Esse domínio já existe no BONDE!' };
      }
    }
  }

  const onClose = () => {
    setOpen(false)
    setDnsHostedZone(undefined)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>{btnText}</Button>
      <Modal width={!dnsHostedZone ? '40%' : '60%'} isOpen={open} onClose={onClose}>
        {!dnsHostedZone
          ? <DomainForm onClose={onClose} onSubmit={onSubmit} />
          : <ConnectDNS
              onClose={() => {
                onClose()
                refetch()
              }}
              dnsHostedZone={dnsHostedZone}
            />
        }
      </Modal>
    </>
  );
}

export default CreateDomainModal;