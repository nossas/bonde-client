import PropTypes from 'prop-types'
import styled from 'styled-components'
import FeedItem from '../FeedItem/FeedItem'

/**
 * The container to render feed items.
 */
const Feed = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  width: 100%;
`

const { oneOfType, instanceOf, arrayOf } = PropTypes

Feed.propTypes = {
  /** Use FeedItem component to compose the Feed. */
  children: oneOfType([
    instanceOf(FeedItem),
    arrayOf(FeedItem)
  ]).isRequired
}

/* @component */
export default Feed

