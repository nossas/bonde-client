import React, { PropTypes } from 'react'
import classnames from 'classnames'


const RenderInputLength = ({ value, limit }) => {
  if (value && value.length > 0) {
    return (
      <div className={classnames('right h3', (value.length > limit - 10 ? 'red' : null))}>{limit - value.length}</div>
    )
  }
  return <noscript></noscript>
}

RenderInputLength.propTypes = {
  limit: PropTypes.number.isRequired,
  value: PropTypes.string
}

export default RenderInputLength
