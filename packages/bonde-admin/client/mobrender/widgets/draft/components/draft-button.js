import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./draft-button.scss')

const DraftButton = ({ icon, label, updateKind, ...props }) => (
  <div className='draft-widget-button col col-4 p1'>
    <button className='btn col-12' onClick={() => updateKind(props)}>
      <span className='content'>
        <i className={`fa fa-${icon} block white`} />
        <span className='text'>{label}</span>
      </span>
    </button>
  </div>
)

DraftButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  updateKind: PropTypes.func.isRequired,
  settings: PropTypes.object
}

export default DraftButton
