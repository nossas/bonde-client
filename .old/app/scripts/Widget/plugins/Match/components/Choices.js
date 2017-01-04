import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Choices = ({ options=[], onChange, title, className, disabled }) => {
  return (
    <div className={classnames(className)}>
      <label
        className="caps bold mb1"
        style={{
          fontSize: '.75rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: 'white'
        }}
      >
        {title}*
      </label>
      <select
        className="choices select block col-12"
        disabled={disabled}
        onChange={onChange}>
        <option>Selecione...</option>
        {options.map((option, index) => (
          <option
            key={`choice-${index}`}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

Choices.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

export default Choices
