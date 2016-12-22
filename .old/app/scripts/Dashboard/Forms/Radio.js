import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Radio extends Component {
  render() {
    const { children, alignment, className, checked, value, onChange } = this.props
    const id = `radio-${value}-id`
    const current = {
      horizontal: { classes: 'pr2' },
      vertical: { classes: 'block' }
    }[alignment]

    return (
      <label
        className={classnames('form-radio', className, current.classes)}
        style={{ cursor: 'pointer' }}
        htmlFor={id}
      >
        <input
          type="radio"
          id={id}
          className="mr1"
          value={value}
          onChange={onChange}
          checked={checked === value}
        />
        {children}
      </label>
    )
  }
}

Radio.propTypes = {
  checked: PropTypes.any,
  alignment: PropTypes.oneOf(['horizontal', 'vertical']),
}

Radio.defaultProps = {
  alignment: 'horizontal'
}

export default Radio
