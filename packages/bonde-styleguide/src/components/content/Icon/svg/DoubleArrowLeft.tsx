import React from 'react'

const Icon = ({ className, color, size }) => (
  <svg
    className={className}
    width={size || '16'}
    height={size || '13'}
    viewBox='0 0 16 13'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g fill='none' fillRule='evenodd'>
      <g transform='translate(-1116 -11655)' fill={color} stroke={color}>
        <g transform='translate(1116 11655)'>
          <g strokeWidth='0.5' fillRule='nonzero'>
            <polygon fill={color} transform='matrix(0 -1 -1 0 10.767 10.767)' points='4.26666667 7.70352667 8.82598417 2.83810732 9.97568098 4.06499206 5.41636347 8.93041142 4.27097401 10.1618927 3.11266252 8.93500794 -1.44234765 4.06499206 -0.292650842 2.83810732' />
            <polygon fill={color} transform='matrix(0 -1 -1 0 18.767 18.767)' points='12.2666667 7.70352667 16.8259842 2.83810732 17.975681 4.06499206 13.4163635 8.93041142 12.270974 10.1618927 11.1126625 8.93500794 6.55765235 4.06499206 7.70734916 2.83810732' />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

Icon.displayName = 'Icon.DoubleArrowLeft'

export default Icon
