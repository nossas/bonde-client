import styled from 'styled-components'

/**
 * Gris system that wraps multiple `Cell` components.
 */
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: ${props => `${props.gap}px`};
`

Grid.displayName = 'Grid'

Grid.defaultProps = {
  gap: 30
}

/** @component */
export default Grid
