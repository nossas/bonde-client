import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The only true paragraph.
 */
const Text = styled.p`
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  text-align: ${props => props.align};
  text-transform: ${props => props.uppercase ? 'uppercase': null};
  letter-spacing: ${props => props.letterSpacing};
`

Text.propTypes = {
  // margin: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  color: PropTypes.string,
  lineHeight: PropTypes.number,
  fontWeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.string,
  uppercase: PropTypes.bool,
}

Text.defaultProps = {
  color: '#424242',
  lineHeight: 1.56,
  fontWeight: 'normal',
  fontSize: 16,
  letterSpacing: 'inherit',
  align: 'left'
}

Text.displayName = 'Text'

/** @component */
export default Text
