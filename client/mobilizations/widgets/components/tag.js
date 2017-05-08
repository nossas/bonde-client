import PropTypes from 'prop-types'
import React from 'react'

const Tag = ({ value, onClick, onRemove }) => {
  const clickable = onClick && typeof onClick === 'function'
  const removable = onRemove && typeof onRemove === 'function'

  return (
    <span
      className='bg-white mr1 mt1 p1 darkengray'
      style={{ cursor: clickable ? 'pointer' : null }}
    >
      <span
        className={(removable ? 'mr1' : null)}
        onClick={(clickable ? () => onClick(value) : null)}
      >
        {value}
      </span>
      {(removable ? <i className='fa fa-close' onClick={() => onRemove(value)} /> : null)}
    </span>
  )
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onRemove: PropTypes.func
}

export default Tag
