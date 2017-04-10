import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

if (require('exenv').canUseDOM) require('./styles.scss')

const RedirectComponent = ({ children, path, onClick }) => (
  <div
    className='redirect-card'
    onClick={() => {
      if (onClick) onClick()
      else if (path) browserHistory.push(path)
    }}
    >
    {children}
  </div>
)

RedirectComponent.propTypes = {
  path: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default RedirectComponent
