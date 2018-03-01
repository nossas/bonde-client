import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from './utils'
import Progress from './Progress'

const ProgressBox = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  font-family: Nunito Sans;
  font-size: 13px;
  line-height: 13px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
`

const Value = styled.div`
  font-family: Nunito Sans;
  font-size: 11px;
  line-height: 11px;
  display: inline-block;
  margin-right: 5px;
  color: ${({ color }) => color};
`

const ItemComponent = ({ className, value, label, color, trackColor, trackSize, maxValue }) => (
  <div className={className}>
    <Label>
      {label}
    </Label>
    <ProgressBox>
      <Value color={color}>
        {value}
      </Value>
      <Progress.Bar
        thumbColor={color}
        trackColor={trackColor}
        size={trackSize}
        value={Math.round((value / maxValue * 100) * 100) / 100}
      />
    </ProgressBox>
  </div>
)

const Item = styled(ItemComponent)`
  margin-bottom: 20px;
`

const sortFn = items => items.sort((a, b) => b.props.value - a.props.value)

const Ranking = ({ className, children, color, trackColor, trackSize, maxValue, nosort }) => {
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
          <Item
            key={Math.random()}
            maxValue={maxValue || sorted[0].props.value}
            {...sharedProps}
            {...props}
          />
        ))
      )}
    </div>
  )
}

const ProgressRanking = styled(Ranking)`
  width: ${props => px(props.width) || 'inherit'};

  & > ${Item}:last-child {
    margin-bottom: 0;
  }
`

ProgressRanking.Item = Item

const { oneOfType, instanceOf, arrayOf, string, number, bool } = PropTypes

ProgressRanking.propTypes = {
  children: oneOfType([
    instanceOf(ItemComponent),
    arrayOf(ItemComponent)
  ]).isRequired,
  color: string,
  trackColor: string,
  trackSize: string,
  maxValue: number,
  nosort: bool
}

ProgressRanking.defaultProps = {
  color: '#50e3c2',
  trackSize: 'xsmall'
}

ProgressRanking.Item.propTypes = {
  value: number.isRequired,
  label: string.isRequired
}

ProgressRanking.displayName = 'ProgressRanking'
ProgressRanking.Item.displayName = 'ProgressRanking.Item'

export default ProgressRanking
