import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-grid-system';
import { Header, Text } from 'bonde-components';
import SelectField from '../../../components/SelectField';
import { Section } from '../Panel';
import { FieldPrefix, PrefixedField } from './FieldPrefix';
import SelectFieldCondition from './SelectFieldCondition';

const TransferPanel: React.FC = () => {
  const { t } = useTranslation('community');

  return (
    <Row>
      <Col xs={12} sm={6}>
        <Section>
          <Header.H4>{t('recipient.form.titles.transfer_date')}</Header.H4>
          <Row>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <Text className='about'>Defina o dia em que o valor arrecadado pela sua comunidade será automaticamente transferido para a conta cadastrada aqui.</Text>
            </Col>
          </Row>
          <FieldPrefix prefix="community.recipient">
            <PrefixedField
              component={SelectField}
              name="transfer_interval"
              label={t('recipient.form.fields.transfer_interval.label')}
            >
              <option value='weekly'>{t('recipient.form.fields.transfer_interval.options.weekly')}</option>
              <option value='monthly'>{t('recipient.form.fields.transfer_interval.options.monthly')}</option>
            </PrefixedField>
            <PrefixedField
              component={SelectFieldCondition}
              parent="community.recipient.transfer_interval"
              name="transfer_day"
              label={t('recipient.form.fields.transfer_day.label')}
            >
              {(value: string) => (
                value === 'weekly' ? (
                  <>
                    <option value='1'>{t('recipient.form.fields.transfer_day.options.mon')}</option>
                    <option value='2'>{t('recipient.form.fields.transfer_day.options.tue')}</option>
                    <option value='3'>{t('recipient.form.fields.transfer_day.options.wed')}</option>
                    <option value='4'>{t('recipient.form.fields.transfer_day.options.thu')}</option>
                    <option value='5'>{t('recipient.form.fields.transfer_day.options.fri')}</option>
                  </>
                ) : (
                    <>
                      <option value='1'>1</option>
                      <option value='6'>6</option>
                      <option value='11'>11</option>
                      <option value='16'>16</option>
                      <option value='21'>21</option>
                      <option value='26'>26</option>
                    </>
                  )
              )}
            </PrefixedField>
          </FieldPrefix>
        </Section>
      </Col>
      <Col xs={12} sm={6}>
        <Section>
          <Header.H4>Observações</Header.H4>
          <ul>
            <li>
              <Text>As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário.</Text>
            </li>
            <li>
              <Text>Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será assim: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.</Text>
            </li>
          </ul>
        </Section>
      </Col>
    </Row>
  );
}

export default TransferPanel;