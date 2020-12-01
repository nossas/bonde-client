import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Header, Icon } from 'bonde-components';
import { Fluid } from '../Styles';
import { DNSHostedZone } from '../types';
import RecordModal from './RecordModal';

const LinkStyled = styled(Link)`
  display: flex;
  text-transform: uppercase;
`

type Props = {
  dnsHostedZone: DNSHostedZone
  refetch: any
}

const Navigation = ({ dnsHostedZone, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const disabled = (dnsHostedZone.status === 'created' || dnsHostedZone.status === 'propagating') && !dnsHostedZone.ns_ok

  return (
    <Fluid>
      <LinkStyled to='/community/domains'>
        <Icon name='ArrowLeft' size='small' />
        <Header.H5>Detalhes do domínio</Header.H5>
      </LinkStyled>
      <Button disabled={disabled} onClick={() => setOpen(true)}>Adicionar registro</Button>
      <RecordModal
        refetch={refetch}
        dnsHostedZone={dnsHostedZone}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fluid>
  );
}

export default Navigation;