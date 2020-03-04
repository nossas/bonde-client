import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '12'}
    height={size || '14'}
    viewBox='0 0 12 14'
  >
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M8.842 0H1.263C.565 0 0 .57 0 1.273v8.909h1.263v-8.91h7.58V0zm1.895 2.545H3.789c-.697 0-1.263.57-1.263 1.273v8.91c0 .702.566 1.272 1.263 1.272h6.948c.698 0 1.263-.57 1.263-1.273V3.818c0-.703-.565-1.273-1.263-1.273zm0 10.182H3.789V3.818h6.948v8.91z'
    />
  </svg>
)

Icon.displayName = 'Icon.Copy'

export default Icon
