import React from 'react'
import { FormattedMessage } from 'react-intl'
import Preview from './preview'

export default ({ subdomain, ...props }) => (
  <Preview {...props}>
    <ul className='ul--table'>
      <li className='li--table'>
        <label className='header'>
          <FormattedMessage
            id='community.components--subdomain.label.name'
            defaultMessage='Nome'
          />
        </label>
        <p className='body'>{subdomain.name.replace('\\052', '*')}</p>
      </li>
      <li className='li--table'>
        <label className='header'>
          <FormattedMessage
            id='community.components--subdomain.label.record-type'
            defaultMessage='Tipo'
          />
        </label>
        <p className='body'>{subdomain.record_type}</p>
      </li>
      <li className='li--table'>
        <label className='header'>
          <FormattedMessage
            id='community.components--subdomain.label.value'
            defaultMessage='Valor'
          />
        </label>
        <div className={`body ${subdomain.record_type.toLowerCase()}`}>
          {subdomain.record_type === 'NS' ? (
            <ul>
              {subdomain.value.split('\n').map((ns, index) => <li key={`ns-${index}`}>{ns}</li>)}
            </ul>
        ) : <p>{subdomain.value}</p>}
        </div>
      </li>
    </ul>
  </Preview>
)
