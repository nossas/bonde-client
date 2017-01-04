import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './scss/mobilization-list-item.scss'

const MobilizationListItem = ({ children, className, onClick }) => (
  <div
    className={classnames(
      'mobilization-list-item bg-white block clearfix hover relative',
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

MobilizationListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default MobilizationListItem
