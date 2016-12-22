import React, { PropTypes } from 'react'

import './mobilization-list-item-header.scss'

const MobilizationListItemHeader = ({ children }) => (
  <div className="mobilization-list-item-header block clearfix caps mb2">
    <div className="list-item-header-avatar avatar-width left pr3" />
    <div className="list-item-table-header-wrapper overflow-hidden">
      {children}
    </div>
  </div>
)

MobilizationListItemHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default MobilizationListItemHeader
