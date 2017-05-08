import PropTypes from 'prop-types'
import React from 'react'
import uuid from 'uuid'

import {
  FormGroup,
  FormControl,
  ControlLabel,
  RadioGroup,
  Radio
} from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { getCodeBanks } from '~client/community/utils'

const CommunitySettingsRecipientPage = ({
  fields: {
    recipient: {
      transfer_interval: transferInterval,
      transfer_day: transferDay,
      transfer_enabled: transferEnabled,
      bank_account
    }
  },
  location,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <FormGroup controlId='transferIntervalId' {...transferInterval}>
      <ControlLabel>Intervalo</ControlLabel>
      <RadioGroup layout='horizontal'>
        <Radio value='weekly'>Semanalmente</Radio>
        <Radio value='monthly'>Mensalmente</Radio>
      </RadioGroup>
    </FormGroup>

    <FormGroup controlId='transferDayId' {...transferDay}>
      <ControlLabel>Dia de transferência</ControlLabel>
      <FormControl type='number' />
    </FormGroup>

    {/* <FormGroup controlId="transferEnabledId" {...transferEnabled}>
      <ControlLabel>Habilitar transferência</ControlLabel>
      <FormControl type="checkbox" />
    </FormGroup> */}

    <div className='section'>
      <h3>Conta bancaria</h3>
      <hr />
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankCodeId' {...bank_account.bank_code}>
            <ControlLabel>Banco</ControlLabel>
            <FormControl componentClass='select'>
              <option value=''>Selecione o banco</option>
              {getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3).map(bank => (
                <option key={uuid()} value={bank.code}>
                  {`${bank.code} - ${bank.name}`}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAccountTypeId' {...bank_account.type}>
            <ControlLabel>Tipo de conta</ControlLabel>
            <RadioGroup layout='vertical'>
              <Radio value='conta_corrente'>Corrente</Radio>
              <Radio value='conta_poupanca'>Poupança</Radio>
            </RadioGroup>
          </FormGroup>
        </div>
      </div>
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankAgencyId' {...bank_account.agency}>
            <ControlLabel>Agência</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAgencyDvId' {...bank_account.agency_dig}>
            <ControlLabel>Dígito</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
      </div>
      <div className='flex flex-wrap'>
        <div className='col col-10 pr1'>
          <FormGroup controlId='bankAccountId' {...bank_account.account}>
            <ControlLabel>Conta</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup controlId='bankAccountDvId' {...bank_account.account_dig}>
            <ControlLabel>Dígito</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
      </div>
      <FormGroup controlId='bankLegalNameId' {...bank_account.legal_name}>
        <ControlLabel>Nome / Razão Social</ControlLabel>
        <FormControl type='text' />
      </FormGroup>
      <FormGroup controlId='bankDocumentNumberId' {...bank_account.document_number}>
        <ControlLabel>CPF / CNPJ</ControlLabel>
        <FormControl type='text' />
      </FormGroup>
    </div>
  </SettingsForm>
)

CommunitySettingsRecipientPage.propTypes = {
  fields: PropTypes.shape({
    recipient: PropTypes.shape({
      transfer_interval: PropTypes.object.isRequired,
      transfer_day: PropTypes.object.isRequired,
      transfer_enabled: PropTypes.object.isRequired,
      bank_account: PropTypes.object.isRequired
    }).isRequired
  }).isRequired,
  // redux-form required props
  submit: PropTypes.func.isRequired
}

export default CommunitySettingsRecipientPage
