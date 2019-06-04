//
// @route /community/recipient
//
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createForm, getValues, Field } from 'storybook/forms'
import {
  combineValidations,
  required,
  isCpfCnpj
} from 'storybook/forms/validate'
import {
  SettingsForm,
  RadioField,
  Radio,
  SelectField,
  Option,
  TextField
} from 'storybook/settings/forms'
import * as normalizers from 'utils/redux-form/normalizers'
import { Title } from 'components/title'
import { asyncEdit } from 'community/action-creators'
import { getCurrent as getCommunity } from 'community/selectors'
import { getCodeBanks } from 'community/utils'
import { RecipientFormWarning } from './helpText'
import { i18nKeys } from './i18n'

const formName = 'communityRecipientForm'
const transferIntervalFieldName = 'recipient.transfer_interval'
const RecipientForm = createForm({
  name: formName,
  fields: [
    'id',
    transferIntervalFieldName,
    'recipient.transfer_day',
    'recipient.transfer_enabled',
    'recipient.bank_account.bank_code',
    'recipient.bank_account.agency',
    'recipient.bank_account.agency_dig',
    'recipient.bank_account.account',
    'recipient.bank_account.account_dig',
    'recipient.bank_account.type',
    'recipient.bank_account.legal_name',
    'recipient.bank_account.document_number'
  ],
  submit: asyncEdit,
  initialValues: (state) => {
    const { id, recipient } = getCommunity(state)
    const values = recipient || {}
    return {
      id,
      recipient: {
        ...values,
        transfer_interval: values.transfer_interval || 'monthly',
        transfer_day: values.transfer_day || 5,
        transfer_enabled: values.transfer_enabled || true
      }
    }
  },
  validate: combineValidations([
    required([
      'recipient.transfer_day',
      'recipient.bank_account.bank_code',
      'recipient.bank_account.agency',
      'recipient.bank_account.account',
      'recipient.bank_account.account_dig',
      'recipient.bank_account.type',
      'recipient.bank_account.legal_name',
      'recipient.bank_account.document_number'
    ]),
    isCpfCnpj('recipient.bank_account.document_number')
  ]),
  component: SettingsForm
})

export default () => {
  const transferInterval = getValues(formName, transferIntervalFieldName)
  const banks = getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3)
  banks.sort((b1, b2) => {
    return Number(b1.code) - Number(b2.code)
  })

  return (
    <RecipientForm i18nKeys={i18nKeys}>
      <RecipientFormWarning />

      <Title size='2'>
        <FormattedMessage
          id='page--community-recipient.title'
          defaultMessage='Agendamento dos Saques'
        />
      </Title>

      <div style={{ display: 'flex' }}>
        <Field
          name={transferIntervalFieldName}
          component={RadioField}
          style={{ maxWidth: '230px' }}
        >
          <Radio value='weekly'>
            <FormattedMessage
              id='page--community-recipient.form.transfer-interval.value.weekly'
              defaultMessage='Semanal'
            />
          </Radio>
          <Radio value='monthly'>
            <FormattedMessage
              id='page--community-recipient.form.transfer-interval.value.monthly'
              defaultMessage='Mensal'
            />
          </Radio>
        </Field>
        <Field name='recipient.transfer_day' component={SelectField}>
          {transferInterval === 'monthly' ? ([
            <Option key='1' value='1' />,
            <Option key='2' value='6' />,
            <Option key='3' value='11' />,
            <Option key='4' value='16' />,
            <Option key='5' value='21' />,
            <Option key='6' value='26' />
          ]) : ([
            <Option
              key='1'
              value='1'
              label={{
                id: 'page--community-recipient.form.transfer-day.weekly.mon',
                defaultMessage: 'Segunda'
              }}
            />,
            <Option
              key='2'
              value='2'
              label={{
                id: 'page--community-recipient.form.transfer-day.weekly.tue',
                defaultMessage: 'Terça'
              }}
            />,
            <Option
              key='3'
              value='3'
              label={{
                id: 'page--community-recipient.form.transfer-day.weekly.wed',
                defaultMessage: 'Quarta'
              }}
            />,
            <Option
              key='4'
              value='4'
              label={{
                id: 'page--community-recipient.form.transfer-day.weekly.thu',
                defaultMessage: 'Quinta'
              }}
            />,
            <Option
              key='5'
              value='5'
              label={{
                id: 'page--community-recipient.form.transfer-day.weekly.fri',
                defaultMessage: 'Sexta'
              }}
            />
          ])}
        </Field>
      </div>

      <Title size='2'>
        <FormattedMessage
          id='page--community-recipient.section--account.title'
          defaultMessage='Conta bancária'
        />
      </Title>

      <Field
        style={{ maxWidth: '230px' }}
        name='recipient.bank_account.type'
        component={RadioField}
      >
        <Radio value='conta_corrente'>
          <FormattedMessage
            id='page--community-recipient.form.bank-account-type.value.checking-account'
            defaultMessage='Corrente'
          />
        </Radio>
        <Radio value='conta_poupanca'>
          <FormattedMessage
            id='page--community-recipient.form.bank-account-type.value.savings-account'
            defaultMessage='Poupança'
          />
        </Radio>
      </Field>
      <Field name='recipient.bank_account.bank_code' component={SelectField}>
        {banks.map((bank, i) => (
          <Option
            key={`bankCode-${i}`}
            value={bank.code}
            label={`${bank.code} - ${bank.name}`}
          />
        ))}
      </Field>

      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', width: '30%' }}>
          <Field
            name='recipient.bank_account.agency'
            type='text'
            component={TextField}
            normalize={normalizers.number.max(5)}
          />
          <Field
            style={{ maxWidth: '100px', marginLeft: '20px' }}
            name='recipient.bank_account.agency_dig'
            type='text'
            component={TextField}
            normalize={normalizers.number.max(1)}
          />
        </div>

        <div style={{ display: 'flex', width: '70%', paddingLeft: '40px' }}>
          <Field
            name='recipient.bank_account.account'
            type='text'
            component={TextField}
            normalize={normalizers.number.max(13)}
          />
          <Field
            style={{ maxWidth: '100px', marginLeft: '20px' }}
            name='recipient.bank_account.account_dig'
            type='text'
            component={TextField}
            normalize={normalizers.number.max(2)}
          />
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <Field
          style={{ maxWidth: '70%' }}
          name='recipient.bank_account.legal_name'
          type='text'
          component={TextField}
        />
        <Field
          style={{ maxWidth: '30%', paddingLeft: '40px' }}
          name='recipient.bank_account.document_number'
          type='text'
          component={TextField}
          normalize={normalizers.documents.cpfCnpj}
        />
      </div>
    </RecipientForm>
  )
}
