import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size || "8"}
    height={size || "13"}
    viewBox="0 0 8 13"
    fill="none"
  >
    <path d="M7 12L1 6.22951L7 1" stroke={color || "#444444"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

Icon.displayName = 'Icon.ArrowLeft'

export default Icon
