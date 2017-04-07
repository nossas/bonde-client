import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { CPF, CNPJ } from 'cpf_cnpj'

import * as CommunityActions from '~community/action-creators'
import * as CommunitySelectors from '~community/selectors'

import Page from './page'

const mapStateToProps = (state, ownProps) => {
  const { id, recipient } = CommunitySelectors.getCurrent(state)
  const values = recipient || {}

  return {
    initialValues: {
      id,
      recipient: {
        ...values,
        transfer_interval: values.transfer_interval || 'monthly',
        transfer_day: values.transfer_day || 5,
        transfer_enabled: values.transfer_enabled || true
      }
    }
  }
}

const mapDispatchToProps = {
  submit: CommunityActions.asyncEdit
}

const fields = [
  'id',
  'recipient.transfer_interval',
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
]

const validate = values => {
  const errors = { recipient: { bank_account: {} } }
  const {
    recipient: {
      transfer_day: transferDay,
      bank_account: {
        bank_code: bankCode,
        agency,
        agency_dig: agencyDig,
        account,
        account_dig: accountDig,
        type,
        legal_name: legalName,
        document_number: documentNumber
      }
    }
  } = values

  if (!transferDay) {
    errors.recipient.transfer_day = 'Campo obrigatório'
  }

  if (!bankCode) {
    errors.recipient.bank_account.bank_code = 'Campo obrigatório'
  }

  if (!agency) {
    errors.recipient.bank_account.agency = 'Campo obrigatório'
  } else if (agency.length > 5) {
    errors.recipient.bank_account.agency = 'Deve conter no máximo 5 digitos'
  }
  if (agencyDig && agencyDig.length > 1) {
    errors.recipient.bank_account.agency_dig = 'Deve conter apenas 1 digito'
  }

  if (!account) {
    errors.recipient.bank_account.account = 'Campo obrigatório'
  } else if (account.length > 13) {
    errors.recipient.bank_account.account = 'Deve conter no máximo 13 digitos'
  }
  if (!accountDig) {
    errors.recipient.bank_account.account_dig = 'Campo obrigatório'
  } else if (accountDig.length > 2) {
    errors.recipient.bank_account.account_dig = 'Deve conter no máximo 2 caracteres'
  }

  if (!type) {
    errors.recipient.bank_account.type = 'Campo obrigatório'
  }

  if (!legalName) {
    errors.recipient.bank_account.legal_name = 'Campo obrigatório'
  }

  if (!documentNumber) {
    errors.recipient.bank_account.document_number = 'Campo obrigatório'
  } else if (documentNumber.length > 11 && documentNumber.length !== 14) {
    errors.recipient.bank_account.document_number = 'CNPJ deve conter 14 digitos'
  } else if (documentNumber.length < 11) {
    errors.recipient.bank_account.document_number = 'CPF deve conter 11 digitos'
  } else if (documentNumber.length === 11 && !CPF.isValid(documentNumber)) {
    errors.recipient.bank_account.document_number = 'CPF inválido'
  } else if (documentNumber.length === 14 && !CNPJ.isValid(documentNumber)) {
    errors.recipient.bank_account.document_number = 'CNPJ inválido'
  }

  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'mailchimpForm',
    fields,
    validate
  })(Page)
)
