import React, { PropTypes } from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

const DomainPreview = ({ domain }) => (
  <div className='domain-preview flex flex-wrap'>
    <span className='circle'>
      <i className='fa fa-check' />
    </span>
    <div className='domain-data'>
      <label>Domínio da comunidade</label>
      <p>{domain.domain_name}</p>
    </div>
    <div className='edit'>
      <i className='fa fa-pencil' />
    </div>
  </div>
)

DomainPreview.propTypes = {
  domain: PropTypes.object.isRequired
}

export default DomainPreview
