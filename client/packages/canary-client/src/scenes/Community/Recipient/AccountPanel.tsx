import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-grid-system';
import { InputField, Header, Text, Validators } from 'bonde-components';
import SelectField from '../../../components/SelectField';
import { Section } from '../Panel';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import BankField from './BankField';
import * as normalize from './normalize';
import { cpfCnpj } from './validators';

const AccountPanel: React.FC = () => {
  const { t } = useTranslation('community');
  const { composeValidators, required } = Validators;

  return (
    <Section>
      <Header.H4>{t('recipient.form.titles.account')}</Header.H4>
      <Row>
        <Col xs={12} md={6} style={{ marginBottom: '15px' }}>
          <Text>Insira os dados da sua conta bancária para começar a receber doações pela ferramenta de crowdfunding.</Text>
        </Col>
      </Row>
      <FieldPrefix prefix='community.recipient.bank_account'>
        <Row>
          <Col xs={12} sm={6}>
            <PrefixedField
              name='bank_code'
              label={t('recipient.form.fields.bank_account.bank_code.label')}
              component={BankField}
              emptyText={t('recipient.form.fields.bank_account.bank_code.options.empty')}
              validate={required(t('recipient.form.fields.bank_account.bank_code.errors.required'))}
            />
          </Col>
          <Col xs={12} sm={6}>
            <PrefixedField
              name='type'
              label={t('recipient.form.fields.bank_account.type.label')}
              component={SelectField}
            >
              <option value='conta_corrente'>{t('recipient.form.fields.bank_account.type.options.conta_corrente')}</option>
              <option value='conta_poupanca'>{t('recipient.form.fields.bank_account.type.options.conta_poupanca')}</option>
            </PrefixedField>
          </Col>
          <Col xs={8} sm={4}>
            <PrefixedField
              name='agencia'
              label={t('recipient.form.fields.bank_account.agencia.label')}
              placeholder={t('recipient.form.fields.bank_account.agencia.placeholder')}
              parse={normalize.max(5)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.agencia.errors.required'))}
            />
          </Col>
          <Col xs={4} sm={2}>
            <PrefixedField
              name='agencia_dv'
              label={t('recipient.form.fields.bank_account.agencia_dv.label')}
              placeholder='Ex: 0'
              parse={normalize.max(1)}
              component={InputField}
            />
          </Col>
          <Col xs={8} sm={4}>
            <PrefixedField
              name='conta'
              label={t('recipient.form.fields.bank_account.conta.label')}
              placeholder={t('recipient.form.fields.bank_account.conta.placeholder')}
              parse={normalize.max(13)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.conta.errors.required'))}
            />
          </Col>
          <Col xs={4} sm={2}>
            <PrefixedField
              name='conta_dv'
              label={t('recipient.form.fields.bank_account.conta_dv.label')}
              placeholder='Ex: 0'
              parse={normalize.max(2)}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.conta_dv.errors.required'))}
            />
          </Col>
          <Col xs={12} sm={6}>
            <PrefixedField
              name='legal_name'
              label={t('recipient.form.fields.bank_account.legal_name.label')}
              placeholder={t('recipient.form.fields.bank_account.legal_name.placeholder')}
              component={InputField}
              validate={required(t('recipient.form.fields.bank_account.legal_name.errors.required'))}
            />
          </Col>
          <Col xs={12} sm={6}>
            <PrefixedField
              name='document_number'
              label={t('recipient.form.fields.bank_account.document_number.label')}
              placeholder={t('recipient.form.fields.bank_account.document_number.placeholder')}
              parse={normalize.document}
              component={InputField}
              validate={composeValidators(
                required(t('recipient.form.fields.bank_account.document_number.errors.required')),
                cpfCnpj({
                  cpf: t('recipient.form.fields.bank_account.document_number.errors.cpf'),
                  cnpj: t('recipient.form.fields.bank_account.document_number.errors.cnpj')
                })
              )}
            />
          </Col>
        </Row>
      </FieldPrefix>
    </Section>
  );
}

export default AccountPanel;