import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

if (require('exenv').canUseDOM) {
  require('./browsable-list-item.scss')
}

const BrowsableListItem = ({ className, style, leftIcon, title, subtitle, rightIcon, path }) => (
  <Link className={classnames('browsable-list-item', className)} style={style} to={path}>
    <i className={`bg-animation-icon fa fa-${rightIcon}`} />
    <i className={`icon left-icon fa fa-${leftIcon}`} />
    <span className='title'>{title}</span>
    <span className='subtitle'>{subtitle}</span>
    <i className={`icon right-icon fa fa-${rightIcon}`} />
  </Link>
)

BrowsableListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string
}

BrowsableListItem.defaultProps = {
  rightIcon: 'arrow-circle-o-right'
}

export default BrowsableListItem
