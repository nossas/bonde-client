import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Scrollbox,
  Feed,
  FeedItem
} from '../../..'

/*
 * The only feeds card component.
 */
const FeedsCard = ({ sectionTitle, minHeight, items }) => (
  <Card title={sectionTitle} minHeight={minHeight}>
    <Scrollbox>
      <Feed>
        {items.map(feed => (
          <FeedItem key={Math.random()} date={feed.date} text={feed.text} />
        ))}
      </Feed>
    </Scrollbox>
  </Card>
)

FeedsCard.propTypes = {
  sectionTitle: PropTypes.string,
  minHeight: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number
    ]).isRequired,
    text: PropTypes.string.isRequired
  }))
}

FeedsCard.defaultProps = {
  minHeight: 274,
  items: []
}

FeedsCard.displayName = 'FeedsCard'

/** @component */
export default FeedsCard
