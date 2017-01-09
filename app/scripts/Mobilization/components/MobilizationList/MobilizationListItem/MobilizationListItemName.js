import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './scss/mobilization-list-item-name.scss'

const TRUNCATE_MAX_LENGTH = 60
const truncate = value => `${value.substring(0, TRUNCATE_MAX_LENGTH).trim()}...`

const MobilizationListItemName = ({ name, goal, className, style, maxLength }) => {
  const truncateLength = maxLength || TRUNCATE_MAX_LENGTH
  return (
    <div className={classnames('list-item-name px3 py2 col col-5', className)} style={style}>
      <b className='block mb1 truncate'>{name}</b>
      <div className='truncate'>{goal}</div>
    </div>
  )
}

MobilizationListItemName.propTypes = {
  name: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

export default MobilizationListItemName
