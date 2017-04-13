import React from 'react'
import {
  FormRedux,
  FormGroup,
  FormControl,
  ControlLabel,
  FormDropdown,
  HelpBlock
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
            <ControlLabel>Subdomínio</ControlLabel>
            <FormControl type='text' />
            <HelpBlock>{`.${dnsHostedZone.domain_name}`}</HelpBlock>
          </FormGroup>
        </div>
        <div className='col col-2'>
          <FormGroup {...recordType}>
            <ControlLabel>Tipo</ControlLabel>
            <FormDropdown>
              {recordTypeList.map(record => <option key={record} value={record}>{record}</option>)}
            </FormDropdown>
          </FormGroup>
        </div>
        <div className='col col-4'>
          <FormGroup {...value}>
            <ControlLabel>Redirecionar para</ControlLabel>
            <FormControl type='text' />
          </FormGroup>
        </div>
        <div className='clearfix' />
      </div>
      <Button type='submit'>Adicionar</Button>
    </div>
  </FormRedux>
)

export default Form
