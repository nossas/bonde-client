import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    className={className}
    width={size || '4'}
    height={size || '13'}
    viewBox='0 0 4 13'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(-1250 -11656)' fill={color}>
        <g transform='translate(1250 11655)'>
          <path fill={color} d='M1.52533333,10.3964 L0.970666667,1.169 L3.13733333,1.169 L2.58266667,10.3964 L1.52533333,10.3964 Z M1.02266667,11.8342 L3.08533333,11.8342 L3.08533333,14 L1.02266667,14 L1.02266667,11.8342 Z' />
        </g>
      </g>
    </g>
  </svg>
)

Icon.displayName = 'Icon.Exclamation'

export default Icon
