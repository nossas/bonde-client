import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../../../utils'
import { ProgressRankingItem } from '../../..'

const sortFn = items => items.sort((a, b) => b.props.value - a.props.value)

/**
 * The component that sorts children items to display as a ranking.
 */
const ProgressRanking = styled(({
  className,
  children,
  color,
  trackColor,
  trackSize,
  maxValue,
  nosort
}) => {
  let sorted = []
  let listItems = []

  if (Array.isArray(children)) {
    sorted = sortFn([...children])
    listItems = !nosort ? sorted : children
  }

  const sharedProps = { color, trackColor, trackSize }

  return (
    <div className={className}>
      {!Array.isArray(children) ? (
        React.cloneElement(children, {
          ...sharedProps,
          maxValue: maxValue || children.props.value
        })
      ) : (
        listItems.map(({ props }) => (
          <ProgressRankingItem
            key={Math.random()}
            maxValue={maxValue || sorted[0].props.value}
            {...sharedProps}
            {...props}
          />
        ))
      )}
    </div>
  )
})`
  width: ${props => px(props.width) || 'inherit'};

  & > ${ProgressRankingItem}:last-child {
    margin-bottom: 0;
  }
`

const { oneOfType, arrayOf, string, number, bool, node } = PropTypes

ProgressRanking.propTypes = {
  /** Use `ProgressRankingItem` to compose the ranking. */
  //
  // TODO: Find a way to compare PropTypes.instanceOf with styled-components.
  //
  // children: oneOfType([
  //   instanceOf(ProgressRankingItem),
  //   arrayOf(instanceOf(ProgressRankingItem))
  // ]).isRequired,
  children: oneOfType([node, arrayOf(node)]).isRequired,
  /** The `ProgressBar` fill value and number color to each of items. */
  color: string,
  /** The `ProgressBar` track background color. */
  trackColor: string,
  /** The `ProgressBar` track size. */
  trackSize: string,
  /** The all ranking progress bar max value to make comparison. */
  maxValue: number,
  /** Avoid to reorder the ranking items ascendantly. */
  nosort: bool
}

ProgressRanking.defaultProps = {
  color: '#50e3c2',
  trackSize: 'xsmall'
}

ProgressRanking.displayName = 'ProgressRanking'

/** @component */
export default ProgressRanking
