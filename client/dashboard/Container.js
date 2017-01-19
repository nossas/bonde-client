import React from 'react'
import classnames from 'classnames'


export default ({ className }) => ({ children, ...props }) => (
  <div className={classnames("container", className)}>
    {children && React.cloneElement(children, props)}
  </div>
)
