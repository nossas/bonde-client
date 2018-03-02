import React from 'react'
import PropTypes from 'prop-types'
import svg from './svg'

const IconColorful = ({ name, color, size }) => {
  const IconSVG = svg[name]

  return <IconSVG color={color} size={size} />
}

const { oneOfType, string, number } = PropTypes

IconColorful.propTypes = {
  name: string.isRequired,
  size: oneOfType([string, number])
}

IconColorful.defaultProps = {
  size: 13
}

export default IconColorful
