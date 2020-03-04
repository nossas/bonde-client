import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../../../utils'

/**
 * The only true image.
 */
const Image = styled.div`
  display: block;
  width: ${props => props.width ? px(props.width) : '100%'};
  height: ${props => px(props.height)};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  ${props => props.rounded && `border-radius: ${props.rounded};`}
`

const { oneOfType, string, number } = PropTypes

Image.propTypes = {
  /** The URL of the image. */
  src: string.isRequired,
  /** The height of the image. */
  height: number.isRequired,
  /** The width of the image. */
  width: number,
  /** The radius of the image border. */
  rounded: oneOfType([string, number])
}

Image.displayName = 'Image'

/** @component */
export default Image
