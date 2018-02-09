import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 20px;
`

const Cell = styled.div`
  display: grid;
  grid-column: span 12;

  /* https://gist.github.com/chrisjlee/5832418 */
  @media (min-width: 320px)  { grid-column: span ${props => props.size[5] || 12}; }
  @media (min-width: 480px)  { grid-column: span ${props => props.size[4] || 6}; }
  @media (min-width: 600px)  { grid-column: span ${props => props.size[3] || 4}; }
  @media (min-width: 801px)  { grid-column: span ${props => props.size[2] || 3}; }
  @media (min-width: 1025px) { grid-column: span ${props => props.size[1] || 2}; }
  @media (min-width: 1281px) { grid-column: span ${props => props.size[0] || 1}; }
`

Cell.propTypes = {
  size: PropTypes.array
}

Cell.defaultProps = {
  size: [1, 2, 3, 4, 6, 12]
}

export { Row, Cell }
