import React from 'react';
import { InputField, Button, Tooltip, Success, Validators } from 'bonde-components';
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from 'react-grid-system';
import UploadField from "../../../components/UploadFile";
import CommunityForm from '../BaseForm';
import Panel from '../Panel';

const { isEmail } = Validators;

export const isValidFromEmail = (value: any) => {
  const regex = /^[a-zà-úA-ZÀ-Ú0-9 ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isEmail('E-mail inválido')(email);
  } else {
    return 'Padrão inválido. Ex: Nome do remente <email@host.com>';
  }
}

const SettingsPage = () => {
  const { t } = useTranslation('community');

  return (
    <CommunityForm
      formName='Settings'
      success={<Success message='UHU! Informações da comunidade atualizadas.' />}
    >
      {({ submitting, dirty }: any) => (
        <Container fluid style={{ width: "100%", padding: "0" }}>
          <Row>
            <Col sm={12} lg={6}>
              <Panel>
                <UploadField
                  label={t('info.form.fields.image.label')}
                  name='community.image'
                />
                <InputField
                  name='community.name'
                  label={t('info.form.fields.name.label')}
                  placeholder={t('info.form.fields.name.placeholder')}
                />
                <InputField
                  name='community.description'
                  label={t('info.form.fields.description.label')}
                  placeholder={t('info.form.fields.description.placeholder')}
                />
                <InputField
                  name='community.city'
                  label={t('info.form.fields.city.label')}
                  placeholder={t('info.form.fields.city.placeholder')}
                />
                <InputField
                  name='community.email_template_from'
                  label={(
                    <Tooltip
                      label={t('info.form.fields.email_template_from.label')}
                      info={(
                        <>
                          <p>{`Escolha um email ao qual tenha fácil acesso. Ele só será usado pelo BONDE quando não for definido um email específico em uma ferramenta da sua comunidade.`}</p>
                          <p>{`Preencha com `}<b>{`Nome do Remetente <nome@mail.com>`}</b></p>
                        </>
                      )}
                    />
                  )}
                  placeholder={t('info.form.fields.email_template_from.placeholder')}
                  validate={isValidFromEmail}
                />
                <Row justify='end'>
                  <Col xs={3}>
                    <Button disabled={submitting || !dirty} type='submit'>{t('buttons.submit')}</Button>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>
        </Container>
      )}
    </CommunityForm>
  );
}

// TODO:
// - Validate
// - Hint
// - UploadField

export default SettingsPage;
