import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '12'}
    height={size || '12'}
    viewBox='0 0 12 12'
  >
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M10.667 10.667H1.333V1.333H6V0H1.333C.597 0 0 .597 0 1.333v9.334C0 11.403.597 12 1.333 12h9.334c.736 0 1.333-.597 1.333-1.333V6h-1.333v4.667zM7.333 0v1.333h2.39L3.17 7.887l.943.943 6.554-6.553v2.39H12V0H7.333z'
    />
  </svg>
)

Icon.displayName = 'Icon.Share'

export default Icon
