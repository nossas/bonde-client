import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { injectIntl } from 'react-intl'
import { CPF, CNPJ } from 'cpf_cnpj'
import * as CommunityActions from '~client/community/action-creators'
import * as CommunitySelectors from '~client/community/selectors'

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

const validate = (values, { intl }) => {
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

  const requiredMessage = intl.formatMessage({
    id: 'page--community-recipient.form.validation.required',
    defaultMessage: 'Campo obrigatório'
  })

  if (!transferDay) {
    errors.recipient.transfer_day = requiredMessage
  }

  if (!bankCode) {
    errors.recipient.bank_account.bank_code = requiredMessage
  }

  if (!agency) {
    errors.recipient.bank_account.agency = requiredMessage
  } else if (agency.length > 5) {
    errors.recipient.bank_account.agency = intl.formatMessage({
      id: 'page--community-recipient.form.bank-agency.validation.max-length',
      defaultMessage: 'Deve conter no máximo 5 digitos'
    })
  }
  if (agencyDig && agencyDig.length > 1) {
    errors.recipient.bank_account.agency_dig = intl.formatMessage({
      id: 'page--community-recipient.form.bank-agency-dv.validation.length',
      defaultMessage: 'Deve conter apenas 1 digito'
    })
  }

  if (!account) {
    errors.recipient.bank_account.account = requiredMessage
  } else if (account.length > 13) {
    errors.recipient.bank_account.account = intl.formatMessage({
      id: 'page--community-recipient.form.bank-account.validation.max-length',
      defaultMessage: 'Deve conter no máximo 13 digitos'
    })
  }
  if (!accountDig) {
    errors.recipient.bank_account.account_dig = requiredMessage
  } else if (accountDig.length > 2) {
    errors.recipient.bank_account.account_dig = intl.formatMessage({
      id: 'page--community-recipient.form.bank-account-dv.validation.max-length',
      defaultMessage: 'Deve conter no máximo 2 caracteres'
    })
  }

  if (!type) {
    errors.recipient.bank_account.type = requiredMessage
  }

  if (!legalName) {
    errors.recipient.bank_account.legal_name = requiredMessage
  }


  if (!documentNumber) {
    errors.recipient.bank_account.document_number = requiredMessage
  } else {
    const docOnlyNum = documentNumber.replace(/[^\d]/g, '')
    if (docOnlyNum.length > 11 && docOnlyNum.length !== 14) {
      errors.recipient.bank_account.document_number = intl.formatMessage({
        id: 'page--community-recipient.form.bank-document-number.validation.cnpj-length',
        defaultMessage: 'CNPJ deve conter 14 digitos'
      })
    } else if (docOnlyNum.length < 11) {
      errors.recipient.bank_account.document_number = intl.formatMessage({
        id: 'page--community-recipient.form.bank-document-number.validation.cpf-length',
        defaultMessage: 'CPF deve conter 11 digitos'
      })
    } else if (docOnlyNum.length === 11 && !CPF.isValid(docOnlyNum)) {
      errors.recipient.bank_account.document_number = intl.formatMessage({
        id: 'page--community-recipient.form.bank-document-number.validation.invalid-cpf-format',
        defaultMessage: 'CPF inválido'
      })
    } else if (docOnlyNum.length === 14 && !CNPJ.isValid(docOnlyNum)) {
      errors.recipient.bank_account.document_number = intl.formatMessage({
        id: 'page--community-recipient.form.bank-document-number.validation.invalid-cnpj-format',
        defaultMessage: 'CNPJ inválido'
      })
    }
  }

  return errors
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(reduxForm({
    form: 'communityRecipientForm',
    fields,
    validate
  })(Page))
)
