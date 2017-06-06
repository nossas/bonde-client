import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Preview from './preview'

const DomainPreview = ({
  domain,
  menuComponent: MenuComponent,
  checked,
  isActive,
  onToggle
}) => (
  <div className={`table-row ${isActive ? 'active' : ''}`}>
    <div className='wrapper'>
      <div className='text' style={{ width: 30 }}>
        <span className={`circle${checked ? ' checked' : ''}`}>
          {checked ? <i className='fa fa-check' /> : <i className='fa fa-close' />}
        </span>
      </div>
    </div>

    <div className='wrapper cell--domain-name' style={{ flex: '10' }}>
      <div className='text' onClick={onToggle}>
        {domain.domain_name}
      </div>
    </div>

    <div className='wrapper'>
      <div className='text'>
        {MenuComponent && (
          <div className='menu--preview'>
            {MenuComponent}
          </div>
        )}
      </div>
    </div>
  </div>
)


DomainPreview.propTypes = {
  domain: PropTypes.object,
  isActive: PropTypes.bool,
  checked: PropTypes.bool,
  menuComponent: PropTypes.element,
  onToggle: PropTypes.func
}

export default DomainPreview
