import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '14'}
    height={size || '13'}
    viewBox='0 0 14 13'
  >
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M11.329 13L7 10.45 2.671 13l1.146-4.81L0 4.955l5.035-.42L7 0l1.965 4.535 5.035.42-3.817 3.235z'
    />
  </svg>
)

Icon.displayName = 'Icon.Star'

export default Icon
