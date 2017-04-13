import React from 'react'
import Preview from './preview'

export default ({ subdomain, ...props }) => (
  <Preview {...props}>
    <div className='row'>
      <div className='col col-6'>
        <label>Subdomínio</label>
        <p>{subdomain.name}</p>
      </div>
      <div className='col col-2'>
        <label>Tipo</label>
        <p>{subdomain.record_type}</p>
      </div>
      <div className='col col-4'>
        <label>Redirecionar para</label>
        <p>{subdomain.value}</p>
      </div>
    </div>
  </Preview>
)
