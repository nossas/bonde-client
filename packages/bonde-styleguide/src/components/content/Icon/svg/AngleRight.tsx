import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '5'}
    height={size || '11'}
    viewBox='0 0 5 11'
  >
    <path
      fill='none'
      fillRule='evenodd'
      stroke={color || '#000'}
      strokeLinecap='square'
      d='M4.01 5.333L.247 1.712 0 1.475.493 1l.247.237L4.503 4.86l.004-.004L5 5.33l-.004.003.004.004-.493.475-.004-.004L.74 9.429l-.247.238L0 9.192l.247-.237L4.01 5.333z'
    />
  </svg>
)

Icon.displayName = 'Icon.AngleRight'

export default Icon
