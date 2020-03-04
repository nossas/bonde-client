import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '11'}
    height={size || '5'}
    viewBox='0 0 11 5'
  >
    <path
      fill='none'
      fillRule='evenodd'
      stroke={color || '#000'}
      strokeLinecap='square'
      d='M5.333 4.01L8.955.247 9.192 0l.475.493-.238.247-3.621 3.763.004.004L5.337 5l-.004-.004L5.33 5l-.475-.493.004-.004L1.237.74 1 .493 1.475 0l.237.247L5.333 4.01z'
    />
  </svg>
)

Icon.displayName = 'Icon.AngleDown'

export default Icon
