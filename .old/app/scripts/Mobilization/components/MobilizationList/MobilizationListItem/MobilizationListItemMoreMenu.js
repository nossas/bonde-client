import React, { PropTypes } from 'react'
import classnames from 'classnames'

// Current module dependencies
import './scss/mobilization-list-item-more-menu.scss'

const MobilizationListItemMoreMenu = ({ active, children }) => (
  <div className={classnames('list-item-more-menu', { 'show': active })}>
    {children}
  </div>
)

MobilizationListItemMoreMenu.contextTypes = {
  router: PropTypes.object.isRequired
}

MobilizationListItemMoreMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

MobilizationListItemMoreMenu.defaultProps = {
  active: false
}

export default MobilizationListItemMoreMenu
