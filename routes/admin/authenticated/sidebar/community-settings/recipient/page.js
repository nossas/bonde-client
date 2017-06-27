import PropTypes from 'prop-types'
import React from 'react'
import uuid from 'uuid'
import { FormattedMessage } from 'react-intl'
import { Warning } from '~client/components/notify'
import { FormGroup, FormControl, ControlLabel, RadioGroup, Radio } from '~client/components/forms'
import { SettingsForm } from '~client/ux/components'
import { getCodeBanks } from '~client/community/utils'
import { Title, Subtitle } from '~client/components/title'
import * as normalizers from '~client/utils/redux-form/normalizers'

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
  intl,
  ...formProps
}) => (
  <SettingsForm {...formProps}>
    <Warning
      title={
        <FormattedMessage
          id='page--community-recipient.warning.title'
          defaultMessage='Importante'
        />
      }
    >
      <ul style={{ paddingLeft: 15, marginBottom: 0 }}>
        <li>
          <FormattedMessage
            id='page--community-recipient.warning.content.list.li-01'
            defaultMessage={
              'Informe: Preencha sua conta bancária abaixo para trasferirmos ' +
              'automaticamente as doações recebidas por sua comunidade.'
            }
          />
        </li>
        <li>
          <FormattedMessage
            id='page--community-recipient.warning.content.list.li-02'
            defaultMessage={
              'Atenção 1: Não é possível fazer a transferência de uma doação já ' +
              'recebida para uma nova conta bancária, sempre será utilizada a conta ' +
              'bancária ativa no momento da doação.'
            }
          />
        </li>
        <li>
          <FormattedMessage
            id='page--community-recipient.warning.content.list.li-03'
            defaultMessage={
              'Atenção 2: As doações só ficam disponíveis 31 dias após a transação ' +
              'de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) ' +
              'no caso de transações com uma parcela e 2 dias úteis após o pagamento ' +
              'do boleto bancário. Caso a transação tenha de 2 a 12 parcelas, o ' +
              'recebimento normal será da seguinte forma: primeira parcela em 31 dias, ' +
              'segunda em 61, terceira em 91, e assim por diante.'
            }
          />
        </li>
      </ul>
    </Warning>

    <Title size='2'>
      <FormattedMessage
        id='page--community-recipient.title'
        defaultMessage='Agendamento dos Saques'
      />
    </Title>

    <div className='flex'>
      <FormGroup {...transferInterval} controlId='transferIntervalId' style={{ width: 190 }}>
        <ControlLabel>
          <FormattedMessage
            id='page--community-recipient.form.transfer-interval.label'
            defaultMessage='Recorrência'
          />
        </ControlLabel>
        <RadioGroup
          layout='horizontal'
          style={{
            marginBottom: 0,
            height: 50,
            display: 'flex',
            alignItems: 'center',
          }}
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
        </RadioGroup>
      </FormGroup>

      <FormGroup {...transferDay} className='flex-auto'>
        <ControlLabel>
          <FormattedMessage
            id='page--community-recipient.form.transfer-day.label'
            defaultMessage='Dia de execução'
          />
        </ControlLabel>
        {transferInterval.value === 'weekly' ? (
          <FormControl componentClass='select'>
            <option value='1'>
              {intl.formatMessage({
                id: 'page--community-recipient.form.transfer-day.weekly.mon',
                defaultMessage: 'Segunda'
              })}
            </option>
            <option value='2'>
              {intl.formatMessage({
                id: 'page--community-recipient.form.transfer-day.weekly.tue',
                defaultMessage: 'Terça'
              })}
            </option>
            <option value='3'>
              {intl.formatMessage({
                id: 'page--community-recipient.form.transfer-day.weekly.wed',
                defaultMessage: 'Quarta'
              })}
            </option>
            <option value='4'>
              {intl.formatMessage({
                id: 'page--community-recipient.form.transfer-day.weekly.thu',
                defaultMessage: 'Quinta'
              })}
            </option>
            <option value='5'>
              {intl.formatMessage({
                id: 'page--community-recipient.form.transfer-day.weekly.fri',
                defaultMessage: 'Sexta'
              })}
            </option>
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
    </div>


    <div className='section'>
      <Title size='2'>
        <FormattedMessage
          id='page--community-recipient.section--account.title'
          defaultMessage='Conta bancária'
        />
      </Title>

      <div className='flex'>
        <FormGroup controlId='bankAccountTypeId' {...bank_account.type} style={{ width: 240 }}>
          <ControlLabel>
            <FormattedMessage
              id='page--community-recipient.form.bank-account-type.label'
              defaultMessage='Tipo de conta'
            />
          </ControlLabel>
          <RadioGroup
            layout='horizontal'
            style={{
              marginBottom: 0,
              height: 50,
              display: 'flex',
              alignItems: 'center',
            }}
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
          </RadioGroup>
        </FormGroup>

        <FormGroup className='flex-auto' controlId='bankCodeId' {...bank_account.bank_code}>
          <ControlLabel>
            <FormattedMessage
              id='page--community-recipient.form.bank-code.label'
              defaultMessage='Banco'
            />
          </ControlLabel>
          <FormControl componentClass='select'>
            <option value=''>
            {intl.formatMessage({
              id: 'page--community-recipient.form.bank-code.value.default',
              defaultMessage: 'Selecione o banco'
            })}
            </option>
            {getCodeBanks(bank => !isNaN(bank.code) && bank.code.length === 3).map(bank => (
              <option key={uuid()} value={bank.code}>
                {`${bank.code} - ${bank.name}`}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      </div>

      <div className='flex flex-wrap mxn2'>
        <div className='col col-12 lg-col-6 px2'>
          <div className='col col-10 pr1'>
            <FormGroup controlId='bankAgencyId' {...bank_account.agency}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-recipient.form.bank-agency.label'
                  defaultMessage='Agência'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={intl.formatMessage({
                  id: 'page--community-recipient.form.bank-agency.placeholder',
                  defaultMessage: 'Digite apenas números'
                })}
              />
            </FormGroup>
          </div>

          <div className='col col-2'>
            <FormGroup controlId='bankAgencyDvId' {...bank_account.agency_dig}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-recipient.form.bank-agency-dv.label'
                  defaultMessage='Dígito'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={intl.formatMessage({
                  id: 'page--community-recipient.form.bank-agency-dv.placeholder',
                  defaultMessage: 'Ex: 0'
                })}
              />
            </FormGroup>
          </div>
        </div>

        <div className='col col-12 lg-col-6 px2'>
          <div className='col col-8 pr1'>
            <FormGroup controlId='bankAccountId' {...bank_account.account}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-recipient.form.bank-account.label'
                  defaultMessage='Conta'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={intl.formatMessage({
                  id: 'page--community-recipient.form.bank-account.plcaeholder',
                  defaultMessage: 'Digite apenas números'
                })}
              />
            </FormGroup>
          </div>

          <div className='col col-4'>
            <FormGroup controlId='bankAccountDvId' {...bank_account.account_dig}>
              <ControlLabel>
                <FormattedMessage
                  id='page--community-recipient.form.bank-account-dv.label'
                  defaultMessage='Dígito'
                />
              </ControlLabel>
              <FormControl
                type='text'
                placeholder={intl.formatMessage({
                  id: 'page--community-recipient.form.bank-account-dv.plcaeholder',
                  defaultMessage: 'Ex: 00'
                })}
              />
            </FormGroup>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap mxn2'>
        <div className='col col-12 lg-col-6 px2'>
          <FormGroup controlId='bankLegalNameId' {...bank_account.legal_name}>
            <ControlLabel>
              <FormattedMessage
                id='page--community-recipient.form.bank-legal-name.label'
                defaultMessage='Nome / Razão Social'
              />
            </ControlLabel>
            <FormControl
              type='text'
              placeholder={intl.formatMessage({
                id: 'page--community-recipient.form.bank-legal-name.placeholder',
                defaultMessage: 'Ex: Minha Sampa'
              })}
            />
          </FormGroup>
        </div>

        <div className='col col-12 lg-col-6 px2'>
          <FormGroup controlId='bankDocumentNumberId' {...bank_account.document_number}>
            <ControlLabel>
              <FormattedMessage
                id='page--community-recipient.form.bank-document-number.label'
                defaultMessage='CPF / CNPJ'
              />
            </ControlLabel>
            <FormControl
              type='text'
              placeholder={intl.formatMessage({
                id: 'page--community-recipient.form.bank-document-number.placeholder',
                defaultMessage: 'Digite apenas números'
              })}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  </SettingsForm>
)

export const normalizer = {
  'recipient.bank_account.agency': normalizers.number.max(5),
  'recipient.bank_account.agency_dig': normalizers.number.max(1),
  'recipient.bank_account.account': normalizers.number.max(13),
  'recipient.bank_account.account_dig': normalizers.number.max(2),
  'recipient.bank_account.document_number': normalizers.documents.cpfCnpj
}

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
