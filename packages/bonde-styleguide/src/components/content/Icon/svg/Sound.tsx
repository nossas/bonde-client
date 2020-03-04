import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || 11}
    height={size || 13}
    viewBox='0 0 11 13'
  >
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M5.293 13c.73 0 1.321-.597 1.321-1.333H3.973c0 .736.59 1.333 1.32 1.333zM9.255 9V5.667c0-2.05-1.08-3.76-2.971-4.214V1c0-.553-.443-1-.99-1a.994.994 0 0 0-.991 1v.453C2.41 1.907 1.33 3.617 1.33 5.667V9l-1.32 1.333V11h10.565v-.667L9.256 9z'
    />
  </svg>
)

Icon.displayName = 'Icon.Sound'

export default Icon
