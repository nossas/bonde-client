import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The only true container.
 */
const Flexbox = styled.div`
  display: flex;

  ${props => props.margin && props.margin.top && `top: ${props.margin.top};`}
  ${props => props.margin && props.margin.bottom && `bottom: ${props.margin.bottom};`}
  ${props => props.margin && props.margin.left && `left: ${props.margin.left};`}
  ${props => props.margin && props.margin.right && `right: ${props.margin.right};`}
  ${props => props.horizontal ? `justify-content: space-between;` : `
    flex-direction: column;
  `}
  ${props => props.row && `
    flex-direction: row;
    flex-grow: 1;
  `}
  ${props => props.fullSize && `flex-grow: 1;`}
  ${props => props.alignItems === 'start' && `align-items: flex-start;`}
  ${props => props.alignItems === 'end' && `align-items: flex-end;`}
  ${props => props.alignItems === 'middle' && `align-items: center;`}
`

Flexbox.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  horizontal: PropTypes.bool,
  row: PropTypes.bool,
  alignItems: PropTypes.oneOf(['start', 'middle', 'end'])
}

Flexbox.defaultProps = {
  padding: {},
  horizontal: false,
  fullSize: false,
  row: false
}

Flexbox.displayName = 'Flexbox'

/** @component */
export default Flexbox
