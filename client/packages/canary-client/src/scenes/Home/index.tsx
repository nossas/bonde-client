import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Content from '../../components/Content';
import CommunitiesGadget from './CommunitiesGadget';
import MobilizationsGadget from './MobilizationsGadget';

const HomePage = () => (
  <Content>
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Row>
        <Col sm={12} md={6}>
          <CommunitiesGadget />
        </Col>
        <Col sm={12} md={6}>
          <MobilizationsGadget />
        </Col>
      </Row>
    </Container>
  </Content>
);

export default HomePage;
