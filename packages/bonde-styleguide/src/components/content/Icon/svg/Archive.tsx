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
      d='M11.697 1.483l-.924-1.12A1.014 1.014 0 0 0 10 0H2c-.31 0-.587.143-.77.363l-.923 1.12a1.32 1.32 0 0 0-.307.85v8.334C0 11.403.597 12 1.333 12h9.334c.736 0 1.333-.597 1.333-1.333V2.333c0-.323-.113-.616-.303-.85zM6 9.667L2.333 6h2.334V4.667h2.666V6h2.334L6 9.667zM1.417 1.333L1.96.667h8l.623.666H1.417z'
    />
  </svg>
)

Icon.displayName = 'Icon.Archive'

export default Icon
