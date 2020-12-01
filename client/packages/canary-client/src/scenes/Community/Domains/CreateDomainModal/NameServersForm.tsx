import React from 'react';
import styled from 'styled-components';
import { Header, Text, Button, Icon } from 'bonde-components';
import { Row, Col } from 'react-grid-system';
import NameServers from '../NameServers';
import Radio from './Radio';

const TopicList = styled.ol`
  margin-left: 20px;
  padding: 18px 0;
`;

const ButtonConnectIP = styled(Button)`
  border-radius: 0;
  max-width: 100% !important;
  background: none;
  border-color: #c7c7c7;
  color: #000;
  padding: 13px 10px !important;
  max-height: 65px!important;
  text-align: left;
  margin: 0 0 15px;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px !important;

  &:hover {
    background: none;
    color: #c7c7c7;
    border-color: #c7c7c7;

    .fill path {
      fill: #c7c7c7  !important;
    }
  }

  &:focus {
    background: none;
    border-color: #000;
    color: #000;
  }

  .fill path {
    fill: #000 !important;
  }
`

type DNSHostedZone = {
  id: number
  name_servers: string[]
}

type Props = {
  status?: string
  changeStatus: any
  connectByIP: any
  dnsHostedZone: DNSHostedZone
}

const NameServersForm = ({ status, changeStatus, connectByIP, dnsHostedZone }: Props) => {
  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Col xs={6}>
          <Header.H2>Agora, precisamos da sua ajuda para conectá-lo ao BONDE</Header.H2>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col xs={6}>
          <Header.H4>Passo a passo</Header.H4>
          <TopicList>
            <li>
              <Text>Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas <b>configurações do domínio</b>.</Text>
            </li>
            <li>
              <Text>Procure a opção <b>{`"Gerenciar DNS"`}</b> e clique nela.</Text>
            </li>
            <li>
              <Text>Em <b>{`"Servidores de Nome"`}</b>, selecione <b>{`"alterar"`}</b>. Depois, clique em <b>{`"Inserir meus próprios servidores de nome"`}</b>.</Text>
            </li>
            <li>
              <Text><b>Copie os 4 códigos abaixo e cole</b> nos campos que apareceram, um em cada campo. (Se necessário, pode adicionar mais campos até colar todos os quatro.)</Text>
            </li>
            <li>
              <Text>Clique em salvar.</Text>
            </li>
          </TopicList>
        </Col>
        <Col xs={6}>
          <NameServers dnsHostedZone={dnsHostedZone} />
          <Radio>
            <input
              type='radio'
              value='registered'
              checked={status === 'registered'}
              onChange={changeStatus}
              />
            <Text>Os registros de nome foram atualizados.</Text>
          </Radio>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ButtonConnectIP type='button' onClick={connectByIP}>
            <span>Prefiro conectar por IP (Avançado)</span>
            <Icon name='ArrowRight' size='small' />
          </ButtonConnectIP>
        </Col>
      </Row>
    </>
  )
}

export default NameServersForm;