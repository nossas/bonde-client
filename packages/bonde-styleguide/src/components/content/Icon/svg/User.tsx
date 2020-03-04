import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '7'}
    height={size || '10'}
    viewBox='0 0 7 10'
  >
    <g
      fill={color || '#000'}
      fillRule='evenodd'
    >
      <path d='M7 8.475C7 6.555 5.433 5 3.5 5S0 6.556 0 8.475s7 1.919 7 0z' />
      <ellipse cx='3.5' cy='2.482' rx='2.5' ry='2.482' />
    </g>
  </svg>
)

Icon.displayName = 'Icon.User'

export default Icon
