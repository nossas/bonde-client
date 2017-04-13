import React from 'react'
import Preview from './preview'

export default ({ domain, ...props }) => (
  <Preview {...props}>
    <label>Domínio da comunidade</label>
    <p>{domain.domain_name}</p>
  </Preview>
)
