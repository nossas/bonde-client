import React from 'react'
import PropTypes from 'prop-types'

const IconOpen = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox='0 0 16 16'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path fillRule='evenodd' clipRule='evenodd' d='M14.2222 14.2222H1.77778V1.77778H8V0H1.77778C0.795555 0 0 0.795555 0 1.77778V14.2222C0 15.2044 0.795555 16 1.77778 16H14.2222C15.2044 16 16 15.2044 16 14.2222V8H14.2222V14.2222ZM9.77778 0V1.77778H12.9644L4.22667 10.5156L5.48444 11.7733L14.2222 3.03556V6.22222H16V0H9.77778Z'/>
  </svg>
)

IconOpen.defaultProps = {
  size: 20,
  color: 'white'
}

IconOpen.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
}

export default IconOpen
