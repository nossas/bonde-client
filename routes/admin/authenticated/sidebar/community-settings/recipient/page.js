import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
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
    <p style={{ color: '#FF9500' }}>
      <FormattedMessage
        id='page--community-recipient.pagarme-warning'
        defaultMessage={
          'Atenção: As doações só ficam disponíveis 31 dias após a transação de cartão de ' +
          'crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações ' +
          'com uma parcela e 2 dias úteis após o pagamento do boleto bancário. Caso a ' +
          'transação tenha de 2 a 12 parcelas, o recebimento normal será da seguinte ' +
          'forma: primeira parcela em 31 dias, segunda em 61, terceira em 91, ' +
          'e assim por diante.'
        }
      />
    </p>
    <FormGroup controlId='transferIntervalId' {...transferInterval}>
      <ControlLabel>Intervalo</ControlLabel>
      <RadioGroup layout='horizontal'>
        <Radio value='weekly'>Semanalmente</Radio>
        <Radio value='monthly'>Mensalmente</Radio>
      </RadioGroup>
    </FormGroup>

    <FormGroup controlId='transferDayId' {...transferDay}>
      <ControlLabel>Dia de transferência</ControlLabel>
      {transferInterval.value === 'weekly' ? (
        <FormControl componentClass='select'>
          <option value='1'>Segunda</option>
          <option value='2'>Terça</option>
          <option value='3'>Quarta</option>
          <option value='4'>Quinta</option>
          <option value='5'>Sexta</option>
        </FormControl>
      ) : (
        <FormControl componentClass='select'>
          <option value='1'>1</option>
          <option value='6'>6</option>
          <option value='11'>11</option>
          <option value='16'>16</option>
          <option value='21'>21</option>
          <option value='26'>26</option>
        </FormControl>
      )}

    </FormGroup>

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
