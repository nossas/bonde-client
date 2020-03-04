import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size || "10"}
    height={size || "15"}
    viewBox="0 0 10 15"
    fill="none"
  >
    <path d="M1.06667 1L8 7.81967L1.06667 14" stroke={color || "#2D2D2D"} strokeWidth="2"/>
  </svg>
)

Icon.displayName = 'Icon.ArrowRight'

export default Icon
