import React, { PropTypes } from 'react'
import classnames from 'classnames'

const HelpBlock = ({ children, className }) => {
  return (
    <p className={classnames('darkengray', className)}>
      <small className='muted'>
        <em>{children}</em>
      </small>
    </p>
  )
}

HelpBlock.propTypes = {
  className: PropTypes.string
}

export default HelpBlock
