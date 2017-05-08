import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames'

const HelpBlock = ({ children, className }) => (
  <p className={classnames('darkengray', className)}>
    <small className='muted'>
      <em>{children}</em>
    </small>
  </p>
)

HelpBlock.propTypes = {
  className: PropTypes.string
}

export default HelpBlock
