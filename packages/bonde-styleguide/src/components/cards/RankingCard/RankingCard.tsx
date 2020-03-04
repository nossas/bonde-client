import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Flexbox,
  ProgressRanking,
  ProgressRankingItem
} from '../../..'

const getMaxValue = items => {
  items.sort((obj1, obj2) => obj2.value - obj1.value)
  return items[0].value
}

const RankingCard = ({
  children,
  sectionTitle,
  minHeight,
  maxValue,
  items,
  alignItems,
  trackColor,
  progressColor
}) => (
  <Card title={sectionTitle} minHeight={minHeight} middle>
    <Flexbox padding={{ x: 24 }} horizontal alignItems={alignItems}>
      <ProgressRanking
        width='100%'
        trackColor={trackColor}
        color={progressColor}
        maxValue={maxValue || getMaxValue(items)}
      >
        {items.map((item, key) => (
          <ProgressRankingItem
            key={key}
            label={item.label}
            value={item.value}
          />
        ))}
      </ProgressRanking>
      {children}
    </Flexbox>
  </Card>
)

RankingCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  maxValue: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  })).isRequired,
  alignItems: PropTypes.oneOf(['start', 'middle', 'end']),
  trackColor: PropTypes.string,
  progressColor: PropTypes.string
}

RankingCard.defaultProps = {
  minHeight: 274,
  items: [],
  alignItems: 'start',
  trackColor: '#fff'
}

RankingCard.displayName = 'RankingCard'

/** @component */
export default RankingCard
