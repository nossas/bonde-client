import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import Raise from './Raise'
import { InputCounter } from '../../components'


class ControlLabel extends Component {
  render() {
    const formGroup = this.context.$formGroup
    const controlId = formGroup && formGroup.controlId
    const error = formGroup && formGroup.error
    const touched = formGroup && formGroup.touched

    const { children, htmlFor = controlId, className, maxLength, ...props } = this.props

    return (
      <label style={{ cursor: 'pointer' }} htmlFor={htmlFor} {...props}>
        <span className={classnames('caps', className)}>{children}</span>
        {maxLength ? <InputCounter className="right regular" maxLength={maxLength} length={formGroup.value ? formGroup.value.length : 0} /> : null}
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
