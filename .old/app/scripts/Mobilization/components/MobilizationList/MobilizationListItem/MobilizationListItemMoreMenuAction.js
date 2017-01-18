import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

const MobilizationListItemMoreMenuAction = ({
  componentClass: Component,
  className,
  text,
  path,
  icon,
  ...rest
}) => {
  const classNameProp = classnames('gray20', className)
  return Component === 'Link' ? (
    <Link to={path} className={classNameProp}>
      <i className={`fa fa-${icon}`} />
      <span>{text}</span>
    </Link>
  ) : (
    <Component {...rest} href={path ? path : undefined} className={classNameProp}>
      <i className={`fa fa-${icon}`} />
      <span>{text}</span>
    </Component>
  )
}

MobilizationListItemMoreMenuAction.propTypes = {
  componentClass: PropTypes.oneOf(['Link', 'a', 'div']),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string.isRequired
}

MobilizationListItemMoreMenuAction.defaultProps = {
  componentClass: 'Link'
}

export default MobilizationListItemMoreMenuAction
