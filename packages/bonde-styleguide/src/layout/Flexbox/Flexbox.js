import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The only true container.
 */
const Flexbox = styled.div`{
  display: flex;
  ${props => borderSpacing('padding', props.padding)}
  ${props => props.horizontal ? `justify-content: space-between;` : `
    flex-direction: column;
  `}
  ${props => props.row && `
    flex-direction: row;
    flex-grow: 1;
  `}
  ${props => props.alignItems === 'start' && `align-items: flex-start;`}
  ${props => props.alignItems === 'end' && `align-items: flex-end;`}
  ${props => props.alignItems === 'middle' && `align-items: center;`}
}`

Flexbox.propTypes = {
  padding: borderSpacingPropTypes,
  horizontal: PropTypes.bool,
  row: PropTypes.bool,
  alignItems: PropTypes.oneOf(['start', 'middle', 'end'])
}

Flexbox.defaultProps = {
  padding: {},
  horizontal: false,
  row: false
}

/* @component */
export default Flexbox
