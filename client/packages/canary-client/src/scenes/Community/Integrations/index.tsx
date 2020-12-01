import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Text, Link as LinkStyled } from 'bonde-components';
import Mailchimp from './Mailchimp';
import Twilio from './Twilio';

const MenuStyled = styled.div`
  padding: 20px 0 24px;

  ${LinkStyled} {
    margin-right: 15px;
    text-transform: uppercase;
    font-weight: bold;
    color: #424242;
    border: none;
    outline: none;
  }
  ${LinkStyled}.active {
    color: #EE0099;
  }
`;

const SettingsPage = () => {
  const { name } = useParams();
  const { path } = useRouteMatch();

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Row>
        <Col xl={12}>
          <Header.H3>Integrações</Header.H3>
          <Text>Conecte sua conta no BONDE a outras ferramentas para expandir seu impacto.</Text>
        </Col>
        <Col xl={12}>
          <MenuStyled>
            <LinkStyled component={Link} to={path.replace(':name', 'mailchimp')} className={name === 'mailchimp' ? 'active' : ''}>Comunicação</LinkStyled>
            <LinkStyled component={Link} to={path.replace(':name', 'twilio')} className={name === 'twilio' ? 'active' : ''}>Pressão</LinkStyled>
          </MenuStyled>
        </Col>
      </Row>
      <Row>
        <Switch>
          <Route exact path={path.replace(':name', 'mailchimp')}>
            <Col sm={12}>
              <Mailchimp />
            </Col>
          </Route>
          <Route exact path={path.replace(':name', 'twilio')}>
            <Col sm={12}>
              <Twilio />
            </Col>
          </Route>
        </Switch>
      </Row>
    </Container>
  );
}

// TODO:
// - Translate
// - Validate (+phone)
// - Hint

export default SettingsPage;
