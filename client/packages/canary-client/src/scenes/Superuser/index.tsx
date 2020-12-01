import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Header, Navigation, Tab, Row, Col } from 'bonde-components';
// import { useSession } from 'bonde-core-tools'
import Content from '../../components/Content';
import CommunityForm from './CommunityForm';
// import Mobilizers from './Mobilizers'

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 0 60px;

  h3 {
    color: #fff;
    margin: 10px 0 30px;
  }
`;

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  match: any
}

const UserPage = ({ match }: Props) => {
  // const { user } = useSession()

  // RegexWith parameters number
  // \/community\/\d+\/mobilizers\/*
  // const isActive = new RegExp(/\/user\/profile\/*/).test(location.pathname)

  return (
    <PageWrap>
      <SubHeader>
        {/** TODO: i18n */}
        <Header.H3>Superusuário</Header.H3>
        <Navigation>
          {/** TODO: i18n */}
          <Tab active>Criar Comunidade</Tab>
        </Navigation>
      </SubHeader>
      <Content>
        <Row>
          <Col>
            <Switch>
              <Route exact path={`${match.path}/add`}>
                <CommunityForm />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Content>
    </PageWrap>
  );
};

export default UserPage;