import React from 'react'

const Button = ({ children, type, pristine, submitting }) => (
  <button type={type} disabled={type === 'submit' ? pristine || submitting : false}>{children}</button>
)

Button.defaultProps = {
  type: 'button'
}

export default Button
