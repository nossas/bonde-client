import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px, borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The only true paragraph.
 */
const Text = styled.p`{
  font-family: 'Nunito Sans', sans-serif;
  font-size: ${props => px(props.fontSize)};
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  color: ${props => props.color};
  text-align: ${props => props.align};
  text-transform: ${props => props.uppercase ? 'uppercase': null};
  ${props => borderSpacing('margin', props.margin)}
}`

Text.displayName = 'Text'

Text.propTypes = {
  margin: borderSpacingPropTypes,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  color: PropTypes.string,
  lineHeight: PropTypes.number,
  fontWeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  fontSize: PropTypes.number,
  uppercase: PropTypes.bool,
}

Text.defaultProps = {
  color: '#000',
  lineHeight: 1.39,
  fontWeight: 'normal',
  fontSize: 18,
  align: 'left',
  margin: {}
}

/* @component */
export default Text
