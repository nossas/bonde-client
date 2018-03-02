import styled from 'styled-components'

/**
 * Gris system that wraps multiple `Cell` components.
 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 20px;
`

/* @component */
export default Grid
