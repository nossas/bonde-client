import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  FormRedux,
  FormGroup,
  FormControl,
  ControlLabel,
  FormDropdown
} from '~client/components/forms'
import { Button } from '~client/ux/components'

if (require('exenv').canUseDOM) require('./styles.scss')

const recordTypeList = ['A', 'AAAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SPF', 'SRV', 'TXT']

const Form = ({ dnsHostedZone, fields: { name, record_type: recordType, value }, ...formProps }) => (
  <FormRedux nosubmit {...formProps}>
    <div className='form--dns-record'>
      <div className='fields--dns-record'>
        <div className='col col-6'>
          <FormGroup {...name}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.label.name'
                defaultMessage='Nome'
              />
            </ControlLabel>
            <FormControl type='text' addonText={`.${dnsHostedZone.domain_name}`} />
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup {...recordType}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.label.record-type'
                defaultMessage='Tipo'
              />
            </ControlLabel>
            <FormDropdown>
              {recordTypeList.map(record => <option key={record} value={record}>{record}</option>)}
            </FormDropdown>
          </FormGroup>
        </div>
        <div className='col col-4'>
          <FormGroup {...value}>
            <ControlLabel>
              <FormattedMessage
                id='community.components--subdomain.label.value'
                defaultMessage='Valor'
              />
            </ControlLabel>
            <FormControl componentClass='textarea' type='text' />
          </FormGroup>
        </div>
        <div className='clearfix' />
      </div>
      <Button type='submit'>
        <FormattedMessage
          id='community.components--subdomain.form.submit--button'
          defaultMessage='Adicionar'
        />
      </Button>
    </div>
  </FormRedux>
)

export default Form
