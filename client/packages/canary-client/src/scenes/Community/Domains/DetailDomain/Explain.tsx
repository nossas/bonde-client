import React from 'react';
import { Header, Icon } from 'bonde-components';
import {
  // ActiveDomainIcon,
  // CertificateDomainIcon,
  ConnectDomainIcon,
  InsertDomainIcon,
  PropagateDomainIcon
} from '../Icons';
import {
  DNS as DTRow,
  Col as DTCol,
  Status,
  List as DTList,
  MainTitle,
  SmallText
} from '../Styles';
import { DNSHostedZone } from '../types';

type Props = {
  dnsHostedZone: DNSHostedZone
  dnsIsActivated: boolean
}

const Explain = ({ dnsHostedZone, dnsIsActivated }: Props) => {
  return (
    <>
      <MainTitle>{!dnsIsActivated ? 'Entenda o processo' : 'Detalhes'}</MainTitle>
      <DTList columnSize='auto 50px auto 50px auto 50px auto 50px auto' rowSize='auto'>
        <DTRow style={{ alignItems: 'center', padding: '10px' }}>
          <DTCol align='center'>
            <InsertDomainIcon />
            <Header.H5>Inserir domínio</Header.H5>
            <SmallText>O primeiro passo é comprar o domínio em um site como GoDaddy ou RegistroBR e inserir aqui no BONDE.</SmallText>
            <Status
              activeStatus='done'
              value='done'
              labels={{ 'done': 'Concluído' }}
            />
          </DTCol>
          <DTCol>
            <Icon name='ArrowRight' size='small' />
          </DTCol>
          <DTCol align='center'>
            <ConnectDomainIcon />
            <Header.H5>Conectar ao BONDE</Header.H5>
            <SmallText>Para conseguir usar seu endereço no BONDE, copie os registros abaixo e cole no site onde comprou seu domínio. <a href="https://www.faq.bonde.org/#block-7283" title='FAQ Dominios' target="_blank" rel="noopener noreferrer">Clique aqui</a> para ver o passo a passo.</SmallText>
            <Status
              isActived={() => !!(dnsHostedZone.status !== 'created' || dnsHostedZone.ns_ok)}
              labels={{ 'active': 'Concluído', 'inactive': 'Inativo' }}
            />
          </DTCol>
          <DTCol>
            <Icon name='ArrowRight' size='small' />
          </DTCol>
          <DTCol align='center'>
            <PropagateDomainIcon />
            <Header.H5>Propagar Domínio</Header.H5>
            <SmallText>O provedor onde você comprou seu domínio faz a propagação. Esse processo pode levar até 48h.</SmallText>
            <Status
              isActived={() => dnsIsActivated}
              labels={{ active: 'Concluído', inactive: 'Inativo' }}
            />
          </DTCol>
          {/* <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <CertificateDomainIcon />
              <Header.H5>Certificar Domínio</Header.H5>
              <SmallText>Quando o provedor concluir a propagação, o BONDE faz a certificação. Esse processo pode levar até 24 horas.</SmallText>
              <Status
                value={dnsHostedZone.certificate?.is_active ? 'active' : 'inactive'}
                labels={{ 'active': 'Completo', 'inactive': 'Inativo' }}
              />
            </DTCol>
            <DTCol>
              <Icon name='ArrowRight' size='small' />
            </DTCol>
            <DTCol align='center'>
              <ActiveDomainIcon />
              <Header.H5>Domínio Ativo</Header.H5>
              <SmallText>Pronto! Seu domínio está  ativo e disponível para utilizar nas páginas da sua comunidade no BONDE.</SmallText>
              <Status
                activeStatus='done'
                value='done'
                labels={{ 'done': 'Concluído' }}
              />
            </DTCol> */}
        </DTRow>
      </DTList>
    </>
  );
}

export default Explain;