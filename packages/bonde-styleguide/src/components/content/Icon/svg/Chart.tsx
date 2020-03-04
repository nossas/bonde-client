import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || "18"}
    height={size || "18"}
    viewBox="0 0 18 18"
    fill="none"
  >
    <path d="M13.5 18H18V3H13.5V18ZM15 4.5H16.5V16.5H15V4.5Z" fill={color || "#EE0099"} />
    <path d="M4.5 11.25H0V18H4.5V11.25ZM3 16.5H1.5V12.75H3V16.5Z" fill={color || "#EE0099"} />
    <path d="M6.75 11.25V18H11.25V7.125H9.75V16.5H8.25V11.25H6.75Z" fill={color || "#EE0099"} />
    <path d="M4.20831 8.25H0V9.75H4.79169L13.7917 1.5H18V0H13.2083L4.20831 8.25Z" fill={color || "#EE0099"} />
  </svg>
)

Icon.displayName = 'Icon.Chart'

export default Icon
