import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './draft-widget-button.scss'

const DraftWidgetButton = ({ label, icon, onClick }) => (
  <div className='draft-widget-button col col-4 p1'>
    <button
      className='btn col-12'
      onClick={onClick}>
      <span className='content'>
        <i className={`fa fa-${icon} block white`} />
        <span className='text'>{label}</span>
      </span>
    </button>
  </div>
)

DraftWidgetButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DraftWidgetButton
