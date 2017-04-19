import React from 'react'
import Preview from './preview'

export default ({ domain, ...props }) => (
  <Preview {...props}>
    <ul className='ul--table'>
      <li className='li--table'>
        <label className='header'>Domínio da comunidade</label>
        <p className='body'>{domain.domain_name}</p>
      </li>
    </ul>
  </Preview>
)
