import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import svg from './svg'

const IconColorful = styled(({ name, color, size, inverted, title }) => {
  const IconSVG = svg[name]

  return <IconSVG color={color} size={size} inverted={inverted} title={title} />
})`
  vertical-align: middle;
`

IconColorful.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inverted: PropTypes.bool
}

IconColorful.defaultProps = {
  size: 13,
  inverted: false
}

IconColorful.displayName = 'IconColorful'

/** @component */
export default IconColorful
