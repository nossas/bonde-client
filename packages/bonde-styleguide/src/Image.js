import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from './utils'

/**
 * The only true image. 
 */
const Image = styled.div`{
  display: block;
  width: ${props => px(props.width) || '100%'};
  height: ${props => px(props.height)};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  ${props => props.rounded && `border-radius: ${px(props.rounded)};`}
}`

Image.displayName = 'Image'

Image.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired
}

export default Image
