import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    className={className}
    width={size || '12'}
    height={size || '9'}
    viewBox='0 0 12 9'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(-420 -34)' stroke={color} strokeWidth='2'>
        <g><polyline points='421 37.6091166 424.466392 41 430.6 35' /></g>
      </g>
    </g>
  </svg>
)

Icon.displayName = 'Icon.Tick'

export default Icon
