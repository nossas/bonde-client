import React from 'react';
import styled from 'styled-components';
import { Header, Text, toast, Success, Icon } from 'bonde-components';
import { Row, Col } from 'react-grid-system';
import copy from 'clipboard-copy';
import Radio from './Radio';
import { DNS as DTRow, Col as DTCol, List as DTList, MainTitle, Button } from '../Styles';

const TopicList = styled.ol`
  margin-left: 20px;
  padding: 18px 0;
`;

type Props = {
  status?: string
  changeStatus: any
}

const IPConnectForm = ({ status, changeStatus }: Props) => {
  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Col xs={6}>
          <Header.H2>Conectar por IP</Header.H2>
          <Text>Para gerenciar ser domínio externamente, você precisa apontá-lo para o IP do BONDE, assim podemos encontrá-lo e conectá-lo à sua página.</Text>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col xs={6}>
          <Header.H4>Passo a passo</Header.H4>
          <TopicList>
            <li>
              <Text>{`Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas configurações do domínio.`}</Text>
            </li>
            <li>
              <Text>{`Procure a opção "Manage DNS" e clique nela.`}</Text>
            </li>
            <li>
              <Text>{`Encontre o registro A ("Type A")`}</Text>
            </li>
            <li>
              <Text>{`Em "Points to", preencha com o Endereço de IP ao lado.`}</Text>
            </li>
            <li>
              <Text>Clique em salvar.</Text>
            </li>
          </TopicList>
        </Col>
        <Col xs={6}>
          <MainTitle>
            {`Registros de nome (Name servers)`}
          </MainTitle>
          <DTList columnSize='auto 200px' rowSize='50px' padding='18px 20px'>
            <DTRow>
              <DTCol>
                <Text>{process.env.REACT_APP_AWS_ROUTE_IP}</Text>
              </DTCol>
              <DTCol>
                <Button
                  onClick={() => {
                    copy(process.env.REACT_APP_AWS_ROUTE_IP || 'not_found_ip');
                    toast(<Success message='Endereço de IP copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                  }}
                >
                  <Icon size='small' name='Copy' /> Copiar
              </Button>
              </DTCol>
            </DTRow>
          </DTList>
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
    </>
  )
}

export default IPConnectForm;