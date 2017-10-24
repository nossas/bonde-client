import React from 'react'

const copy = (children, props) => {
  const filtered = children.filter(child => child)
  return filtered.map(child => React.cloneElement(child, props))
}

export default ({ children, ...props }) => (
  <div style={{ position: 'relative', zIndex: 2 }}>
    {children && copy(children, props)}
  </div>
)
