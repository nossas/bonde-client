import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { generateValidation } from 'redux-form-validation'
import { CPF, CNPJ } from 'cpf_cnpj'

import {
  FormRedux,
  SubmitButton,
  FormGroup,
  FormControl,
  ControlLabel,
  UploadImageField,
  SuccessMessage,
  RadioGroup,
  Radio
} from '../../Dashboard/Forms'
import { getCodeBanks } from '../utils'
import { FloatLayout } from '../../Dashboard/Grids'

import { edit } from '../actions'


class RecipientPage extends Component {

  render() {
    const {
      fields: {
        recipient: {
          transfer_interval,
          transfer_day,
          transfer_enabled,
          bank_account
        }
      },
      ...formProps
    } = this.props

    return (
      <FormRedux nosubmit {...formProps}>

        <FormGroup controlId="transferIntervalId" {...transfer_interval}>
          <ControlLabel>Intervalo</ControlLabel>
          <RadioGroup layout="horizontal">
            <Radio value="weekly">Semanalmente</Radio>
            <Radio value="monthly">Mensalmente</Radio>
          </RadioGroup>
        </FormGroup>

        <FormGroup controlId="transferDayId" {...transfer_day}>
          <ControlLabel>Dia de transferência</ControlLabel>
          <FormControl type="number" />
        </FormGroup>

        {/*<FormGroup controlId="transferEnabledId" {...transfer_enabled}>
          <ControlLabel>Habilitar transferência</ControlLabel>
          <FormControl type="checkbox" />
        </FormGroup>*/}

        <div className="section">
          <h3>Conta bancaria</h3>
          <hr />
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankCodeId" {...bank_account.bank_code}>
                <ControlLabel>Banco</ControlLabel>
                <FormControl componentClass="select">
                  <option value="">Selecione o banco</option>
                  {getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3).map(bank => (
                    <option value={bank.code}>{`${bank.code} - ${bank.name}`}</option>
                  ))}
                </FormControl>
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAccountTypeId" {...bank_account.type}>
                <ControlLabel>Tipo de conta</ControlLabel>
                <RadioGroup layout="vertical">
                  <Radio value="conta_corrente">Corrente</Radio>
                  <Radio value="conta_poupanca">Poupança</Radio>
                </RadioGroup>
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankAgencyId" {...bank_account.agency}>
                <ControlLabel>Agência</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAgencyDvId" {...bank_account.agency_dig}>
                <ControlLabel>Digíto</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="col col-10 pr1">
              <FormGroup controlId="bankAccountId" {...bank_account.account}>
                <ControlLabel>Conta</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
            <div className="col col-2">
              <FormGroup controlId="bankAccountDvId" {...bank_account.account_dig}>
                <ControlLabel>Digíto</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
            </div>
          </div>
          <FormGroup controlId="bankLegalNameId" {...bank_account.legal_name}>
            <ControlLabel>Nome / Razão Social</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
          <FormGroup controlId="bankDocumentNumberId" {...bank_account.document_number}>
            <ControlLabel>CPF / CNPJ</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
        </div>

        <FloatLayout position="floatTopRight">
          <SubmitButton>Salvar</SubmitButton>
          <SuccessMessage text="Dados editados com sucesso." />
        </FloatLayout>
      </FormRedux>
    )
  }
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
  'recipient.bank_account.document_number',
]

const validate = values => {
  const errors = { recipient: { bank_account: {} } }
  const {
    recipient: {
      transfer_day,
      bank_account: {
        bank_code,
        agency,
        agency_dig,
        account,
        account_dig,
        type,
        legal_name,
        document_number
      }
    }
  } = values

  if (!transfer_day) {
    errors.recipient.transfer_day = 'Campo obrigatório'
  }

  if (!bank_code) {
    errors.recipient.bank_account.bank_code = 'Campo obrigatório'

  }

  if (!agency) {
    errors.recipient.bank_account.agency = 'Campo obrigatório'
  } else if (agency.length > 5) {
    errors.recipient.bank_account.agency = 'Deve conter no máximo 5 digitos'
  }
  if (agency_dig && agency_dig.length > 1) {
    errors.recipient.bank_account.agency_dig = 'Deve conter apenas 1 digito'
  }

  if (!account) {
    errors.recipient.bank_account.account = 'Campo obrigatório'
  } else if (account.length > 13) {
    errors.recipient.bank_account.account = 'Deve conter no máximo 13 digitos'
  }
  if (!account_dig) {
    errors.recipient.bank_account.account_dig = 'Campo obrigatório'
  } else if (account_dig.length > 2) {
    errors.recipient.bank_account.account_dig = 'Deve conter no máximo 2 caracteres'
  }

  if (!type) {
    errors.recipient.bank_account.type = 'Campo obrigatório'
  }

  if (!legal_name) {
    errors.recipient.bank_account.legal_name = 'Campo obrigatório'
  }

  if (!document_number) {
    errors.recipient.bank_account.document_number = 'Campo obrigatório'
  } else if (document_number.length > 11 && document_number.length !== 14) {
    errors.recipient.bank_account.document_number = 'CNPJ deve conter 14 digitos'
  } else if (document_number.length < 11) {
    errors.recipient.bank_account.document_number = 'CPF deve conter 11 digitos'
  } else if (document_number.length === 11 && !CPF.isValid(document_number)) {
    errors.recipient.bank_account.document_number = 'CPF inválido'
  } else if (document_number.length === 14 && !CNPJ.isValid(document_number)) {
    errors.recipient.bank_account.document_number = 'CNPJ inválido'
  }

  return errors
}

const mapStateToProps = (state, ownProps) => {

  const { community: { id, recipient } } = ownProps
  const values = recipient ? recipient : {}

  return {
    initialValues: {
      id,
      recipient: {
        ...values,
        transfer_interval: values.transfer_interval || 'monthly',
        transfer_day: values.transfer_day || 5,
        transfer_enabled: values.transfer_enabled || true,
      },
    },
  }
}

export default reduxForm({
  form: 'recipientForm',
  fields,
  validate
}, mapStateToProps, { submit: edit })(RecipientPage)
