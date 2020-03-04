import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The Grid composition Cell component.
 */
const Cell = styled.div`
  display: grid;
  grid-column: span 12;

  ${props => props.align && `text-align: ${props.align};`}

  /* https://gist.github.com/chrisjlee/5832418 */
  @media (min-width: 320px)  { grid-column: span ${props => props.size[5] || 12}; }
  @media (min-width: 480px)  { grid-column: span ${props => props.size[4] || 6}; }
  @media (min-width: 600px)  { grid-column: span ${props => props.size[3] || 4}; }
  @media (min-width: 801px)  { grid-column: span ${props => props.size[2] || 3}; }
  @media (min-width: 1025px) { grid-column: span ${props => props.size[1] || 2}; }
  @media (min-width: 1281px) { grid-column: span ${props => props.size[0] || 1}; }
`

Cell.propTypes = {
  /**
   * The cell size in 12 columns grid style.
   * For the responsiveness, 6 differente media queries are used.
   * The array values is for the media queries:
   * **size[0]:** `>= 1281px`,
   * **size[1]:** `>= 1025px`,
   * **size[2]:** `>= 801px`,
   * **size[3]:** `>= 600px`,
   * **size[4]:** `>= 480px`,
   * **size[5]:** `>= 320px`
   */
  size: PropTypes.array
}

Cell.defaultProps = {
  size: [1,2,3,4,6,12]
}

Cell.displayName = 'Cell'

/** @component */
export default Cell
