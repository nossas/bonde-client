import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Success, Button, Header, Text } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import Panel from '../Panel';
import AccountPanel from './AccountPanel';
import TransferPanel from './TransferPanel';
import CommunityForm from '../BaseForm';

const RecipientPage = () => {
  const { t } = useTranslation('community');

  return (
    <Container fluid style={{ width: '100%', padding: '0' }}>
      <Row>
        <Col xl={12} style={{ marginBottom: '24px' }}>
          <Header.H3>Recebimentos</Header.H3>
          <Text>Insira os dados da sua conta bancária para começar a receber doações pela ferramenta de crowdfunding.</Text>
        </Col>
      </Row>
      <CommunityForm
        formName='Recipient'
        success={<Success message='EBA! Conta bancária atualizada.' />}
      >
        {({ submitting, dirty }: any) => (
          <Panel>
            <AccountPanel />
            <TransferPanel />
            <Row justify='end'>
              <Col xs={12} sm={4} md={3} lg={2}>
                <Button type='submit' disabled={submitting || !dirty}>{t('buttons.submit')}</Button>
              </Col>
            </Row>
          </Panel>
      )}
      </CommunityForm>
    </Container>
  );
}

export default RecipientPage;
