import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import Raise from './Raise'

class ControlLabel extends Component {
  render() {
    const formGroup = this.context.$formGroup
    const controlId = formGroup && formGroup.controlId
    const error = formGroup && formGroup.error
    const touched = formGroup && formGroup.touched

    const { children, htmlFor = controlId, className, ...props } = this.props

    return (
      <label
        style={{ cursor: 'pointer' }}
        htmlFor={htmlFor}
        {...props}
      >
        <span className={classnames('caps', className)}>{children}</span>
        {error && touched && <Raise error={error} />}
      </label>
    )
  }
}

ControlLabel.contextTypes = {
  $formGroup: PropTypes.object,
}

ControlLabel.propTypes = {
  htmlFor: PropTypes.string,
}

export default ControlLabel
