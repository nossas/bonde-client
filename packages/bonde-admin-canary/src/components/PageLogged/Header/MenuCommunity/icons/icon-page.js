import React from 'react'

const IconPage = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 22 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path fillRule='evenodd' clipRule='evenodd' d='M1.5 1.5V16.5H20.5V1.5H1.5ZM1 0C0.447715 0 0 0.447716 0 1V17C0 17.5523 0.447716 18 1 18H21C21.5523 18 22 17.5523 22 17V1C22 0.447715 21.5523 0 21 0H1Z' fill='#fff' />
    <path fillRule='evenodd' clipRule='evenodd' d='M22 6.00003H0V4.50003H22V6.00003Z' fill='#fff' />
    <path d='M19.0003 2.74998C19.0003 3.1642 18.6645 3.49998 18.2503 3.49998C17.8361 3.49998 17.5003 3.1642 17.5003 2.74998C17.5003 2.33577 17.8361 1.99998 18.2503 1.99998C18.6645 1.99998 19.0003 2.33577 19.0003 2.74998Z' fill='#fff' />
  </svg>
)

IconPage.defaultProps = {
  size: 20
}

export default IconPage
