import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import svg from './svg'

const Icon = styled(({ className, name, color, size }) => {
  const IconSVG = svg[name]

  return <IconSVG className={className} color={color} size={size} />
})`
  vertical-align: middle;
`

const { oneOfType, string, number } = PropTypes

Icon.propTypes = {
  /** The name of icon to be rendered. */
  name: string.isRequired,
  /** The color of icon. */
  color: string,
  /** The size of icon. */
  size: oneOfType([string, number])
}

Icon.defaultProps = {
  color: '#000000',
  size: 13
}

Icon.displayName = 'Icon'

/** @component */
export default Icon
