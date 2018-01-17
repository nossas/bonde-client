import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const ForceDownloadViaAjax = ({ onClick, title, className, icon }) => (
  <div className='DownloadItem' style={{ cursor: 'pointer' }}>
    <p>
      <a className={classnames('table align-middle', className)} href='#' onClick={onClick}>
        {icon && <i className={`fa fa-${icon} white h2 pr1 align-middle`} />}
        <span className='align-middle'>{title}</span>
      </a>
    </p>
  </div>
)

ForceDownloadViaAjax.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}

export default ForceDownloadViaAjax
