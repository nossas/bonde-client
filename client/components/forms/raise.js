import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Raise = ({ className, error, ...props }) => (
  <span className={classnames('red', className)} {...props}>{` - ${error}`}</span>
)

Raise.propTypes = {
  error: PropTypes.string.isRequired
}

export default Raise
