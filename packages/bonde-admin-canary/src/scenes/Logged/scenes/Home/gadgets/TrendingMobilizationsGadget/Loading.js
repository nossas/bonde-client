import React from 'react'
import PropTypes from 'prop-types'
import { Cell, Panel } from 'bonde-styleguide'

const TrendingMobilizationsCellsLoading = ({ cells }) => (
  Array(cells).fill('').map(() => (
    <Cell key={Math.random()} size={[6, 6, 6]}>
      <Panel loading image='' title='' author='' />
    </Cell>
  ))
)

const { number } = PropTypes

TrendingMobilizationsCellsLoading.propTypes = {
  cells: number
}

TrendingMobilizationsCellsLoading.defaultProps = {
  cells: 4
}

export default TrendingMobilizationsCellsLoading
