import React from 'react';
import {
  InputField,
  Header,
  Text,
  Button,
  Tooltip,
  Success
} from 'bonde-components';
import { Container, Row, Col, Visible } from 'react-grid-system';
import { useTranslation } from 'react-i18next';
import CommunityForm from '../BaseForm';
import Panel, { Section } from '../Panel';
import MailchimpIcon from './MailchimpIcon';

const MailchimpPanel = () => {
  const { t } = useTranslation('community');
  
  return (
    <CommunityForm
      formName='Integrations'
      success={<Success message='Yeaa! Mailchimp conectado ao BONDE.' />}
    >
      {({ submitting, dirty }: any) => (
        <Panel>
          <Container fluid style={{ width: '100%', padding: '0' }}>
            <Row>
              <Col sm={12} md={2} style={{ textAlign: 'center' }}>
                <MailchimpIcon />
              </Col>
              <Col sm={12} md={6}>
                <Section>
                  <Visible md lg xl>
                    <Header.H3>Mailchimp</Header.H3>
                  </Visible>
                  <Text>Conecte ao Mailchimp para se comunicar com as pessoas que agirem nas mobilizações da sua comunidade.</Text>
                </Section>
                <Section>
                  <Header.H4>Pra começar</Header.H4>
                  <Text>Crie ou acesse sua conta no <a href='https://login.mailchimp.com/signup/' title='Mailchimp' target='_blank' rel="noopener noreferrer">Mailchimp</a>.</Text>
                </Section>
                <Section>
                  <Header.H4>Integrar</Header.H4>
                  <InputField
                    name='community.mailchimp_api_key'
                    label={(
                      <Tooltip
                        label={t('integrations.form.fields.mailchimp_api_key.label')}
                        info={(
                          <>
                            <p><b>Onde encontro essa informação?</b></p>
                            <p>Faça login na sua conta no Mailchimp e <b>clique no seu nome</b> de usuário.</p>
                            <p>Você vai ver um menu surgir, clique na opção account.</p>
                            <p>{`Depois, siga os passos: `}<b>{`Extras > API keys > Your API keys > Create a Key`}</b></p>
                            <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                          </>
                        )}
                      />
                    )}
                    placeholder={t('integrations.form.fields.mailchimp_api_key.placeholder')}
                  />
                  <InputField
                    name='community.mailchimp_list_id'
                    label={(
                      <Tooltip
                        label={t('integrations.form.fields.mailchimp_list_id.label')}
                        info={(
                          <>
                            <p><b>Onde encontro essa informação?</b></p>
                            <p>Faça login na sua conta no Mailchimp e <b>clique em Audience</b>.</p>
                            <p>Selecione a audiência correspondente e <b>clique em Settings</b>.</p>
                            <p>Agora é só <b>copiar o código</b> e colar aqui no campo.</p>
                          </>
                        )}
                      />
                    )}
                    placeholder={t('integrations.form.fields.mailchimp_list_id.placeholder')}
                  />
                  <Row justify='end'>
                    <Col sm={12} md={12} lg={8} xl={6}>
                      <Button type='submit' disabled={submitting || !dirty}>Conectar ao mailchimp</Button>
                    </Col>
                  </Row>
                </Section>
                <Section>
                  <Header.H4>Forçar sincronização</Header.H4>
                  <Text>Sua base no Mailchimp não está atualizada? Tudo bem! Clique em sincronizar pra dar um empurrãozinho:</Text>
                  <Row justify='end'>
                    <Col sm={12} md={12} lg={8} xl={6}>
                      <Button type='button' dark>Sincronizar</Button>
                    </Col>
                  </Row>
                </Section>
              </Col>
              <Col sm={12} md={4}>
                <Section>
                  <Header.H4>Funcionalidades</Header.H4>
                  <ul>
                    <li>
                      <Text>Comunicação por e-mail com todas as pessoas que agirem nas páginas da sua comunidade.</Text>
                    </li>
                    <li>
                      <Text>Criação automática de segmentos estáticos no Mailchimp</Text>
                    </li>
                    <li>
                      <Text>Comunicação segmentada para reengajar membros da comunidade.</Text>
                    </li>
                  </ul>
                </Section>
                <Section>
                  <Header.H4>Dificuldade: Fácil</Header.H4>
                  <ul>
                    <li>
                      <Text>Não precisa saber programar :)</Text>
                    </li>
                    <li>
                      <Text>Ferramenta em inglês.</Text>
                    </li>
                    <li>
                      <Text>Ferramenta paga.</Text>
                    </li>
                  </ul>
                </Section>
                <Section>
                  <Header.H4>Observações</Header.H4>
                  <Text>Os segmentos criados pelo BONDE no Mailchimp seguem esse formato: M999P000, M999F000, M999D000 (M=Mobilização, P=Pressão, F=Formulário, D=Doação)</Text>
                </Section>
              </Col>
            </Row>
          </Container>
        </Panel>
      )}
    </CommunityForm>
  );
}

export default MailchimpPanel;