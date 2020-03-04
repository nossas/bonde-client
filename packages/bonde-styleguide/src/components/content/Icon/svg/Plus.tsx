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
      fill='#D8D8D8'
      fillRule='evenodd'
      stroke={color || '#000'}
      strokeLinecap='square'
      strokeWidth='1.5'
      d='M6.147 5.771H11v.284H6.147V11h-.302V6.055H1v-.284h4.845V1h.302v4.772z'
    />
  </svg>
)

Icon.displayName = 'Icon.Plus'

export default Icon
