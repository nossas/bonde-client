import React from 'react'
import PropTypes from 'prop-types'
import svg from './svg'

const Icon = ({ name, color, size }) => {
  const IconSVG = svg[name]

  return <IconSVG color={color} size={size} />
}

const { oneOfType, string, number } = PropTypes

Icon.propTypes = {
  name: string.isRequired,
  color: string,
  size: oneOfType([string, number])
}

Icon.defaultProps = {
  color: '#000000',
  size: 13
}

export default Icon
