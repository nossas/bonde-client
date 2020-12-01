import React from 'react';
import styled from 'styled-components';
import { Header, Text, Button, Link, ConnectedForm, InputField, Hint, Validators } from 'bonde-components';
import { Container, Row, Col } from 'react-grid-system';

const AddOn = styled.div`
  display: flex;
  background-color: #eee;
  padding: 14px 16px;
  align-items: center;
  margin-top: 20px;

  & > div {
    padding: 0;
    flex-direction: row;
    align-items: center;
    width: 100%;

    label {
      text-transform: lowercase;
      font-size: 16px;
      margin-right: 10px;
    }

    input {
      background-color: #fff;
      flex-grow: 1;
    }
  }
`;

const RichText = styled(Text)`
  a {
    color: #ee0099;

    &:hover {
      color: #e2058a;
    }
  }
`

type Props = {
  onClose: any
  onSubmit: any
}

const { composeValidators, required } = Validators;

const isDomain = (value: any) => /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(value) ? undefined : ' X ';

const DomainForm = ({ onSubmit, onClose }: Props) => {
  return (
    <ConnectedForm onSubmit={onSubmit}>
      {({ submiting, dirty, submitError }) => (
        <Container fluid style={{ width: '100%', padding: '0' }}>
          <Row style={{ marginBottom: '24px' }}>
            <Col xs={12}>
              <Header.H2>Adicionar domínio</Header.H2>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={12}>
              <RichText>Pra começar, você precisa comprar um domínio em um site como GoDaddy ou RegistroBR. Se isso tudo é novo pra você, <a href="https://www.faq.bonde.org/#block-7283" title="FAQ Dominios" target="_blank" rel="noopener noreferrer">clique aqui</a> pra saber mais.</RichText>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col xs={12}>
              <Text><b>Já tem um domínio?</b> Então adicione ele aqui:</Text>
              <AddOn>
                <InputField
                  label='http://www.'
                  name='value'
                  type='text'
                  validate={composeValidators(
                    required('Preencha o dominio'),
                    isDomain
                  )}
                />
              </AddOn>
            </Col>
            {submitError && (
              <Col xs={12}>
                <Hint color='error'>{submitError}</Hint>
              </Col>
            )}
          </Row>
          <Row style={{ alignItems: 'center' }}>
            <Col xs={6}>
              <Link style={{ cursor: 'pointer' }} onClick={onClose}>Cancelar</Link>
            </Col>
            <Col xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={submiting || !dirty} type='submit'>Continuar</Button>
            </Col>
          </Row>
        </Container>
      )}
    </ConnectedForm>
  );
}

export default DomainForm;