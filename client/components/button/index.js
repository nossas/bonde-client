/*
 * Component: Button
 */
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

if (require('exenv').canUseDOM) require('./styles.scss')

// TODO: Change to style component
const basscss = 'btn white bg-pagenta caps p2 rounded h4'

const Button = ({ children, type, disabled, to, onClick }) => {

  const className = classnames(
    basscss,
    disabled ? 'disabled' : null
  )

  if (to) return <Link to={to} className={className}>{children}</Link>

  return (
    <button
      type={type}
      onClick={e => type !== 'submit' && onClick(e)}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  disabled: PropTypes.bool,
  // Navigation
  to: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  type: 'button'
}

export default Button
