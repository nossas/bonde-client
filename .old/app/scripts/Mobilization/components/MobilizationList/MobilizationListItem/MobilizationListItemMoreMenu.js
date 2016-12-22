import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import * as Paths from '../../../../Paths'
import { MobilizationListItemMoreMenuAction } from './'

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
