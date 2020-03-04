import React from 'react'

const Icon = ({ className, size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    width={size || '22'}
    height={size || '22'}
    fill='none'
    viewBox='0 0 30 30'
  >
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M3.003 15.945l.006.01c.81 1.36.907 3.014.294 4.444h7.414c5.209.051 9.506-4.066 9.682-9.274a9.404 9.404 0 00-1.394-5.05c-2.722-4.423-8.512-5.8-12.932-3.078C1.653 5.72.275 11.512 2.997 15.935l.006.01zm-1.385 4.239a3.308 3.308 0 00.016-3.41C-1.55 11.598.061 4.82 5.234 1.634s11.948-1.574 15.133 3.6A11.003 11.003 0 0122 11.162C21.802 17.245 16.785 22.058 10.7 22H2.656a1.205 1.205 0 01-1.038-1.816z'
      clipRule='evenodd'
    />
    <path
      fill={color || '#000'}
      fillRule='evenodd'
      d='M17 10H6V8.5h11V10zM13.7 14H6v-1.5h7.7V14z'
      clipRule='evenodd'
    />
  </svg>
)

Icon.displayName = 'Icon.BallonText'

export default Icon