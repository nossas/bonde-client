import React from 'react'

const Icon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='65' height='30' viewBox='0 0 65 30'>
    <g fill='none' fillRule='evenodd'>
      <rect width='61' height='24' fill='#000' rx='12' />
      <text fill='#FFF' fontFamily='NunitoSans-Bold, Nunito Sans' fontSize='9' fontWeight='bold' letterSpacing='.64'>
          <tspan x='24.384' y='15'>OK</tspan>
      </text>
      <circle cx='54.5' cy='19.5' r='10.5' fill='#E09' opacity='.297' />
      <circle cx='54.5' cy='19.5' r='8.5' fill='#E09' opacity='.3' />
      <circle cx='54.5' cy='19.5' r='6.5' fill='#E09' />
    </g>
  </svg>
)

Icon.displayName = 'IconColorful.Ok'

export default Icon
