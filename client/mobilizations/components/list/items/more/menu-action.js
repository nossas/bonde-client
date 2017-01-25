import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

const MenuAction = ({
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
    <Component {...rest} href={path || undefined} className={classNameProp}>
      <i className={`fa fa-${icon}`} />
      <span>{text}</span>
    </Component>
  )
}

MenuAction.propTypes = {
  componentClass: PropTypes.oneOf(['Link', 'a', 'div']),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
  icon: PropTypes.string.isRequired
}

MenuAction.defaultProps = {
  componentClass: 'Link'
}

export default MenuAction
