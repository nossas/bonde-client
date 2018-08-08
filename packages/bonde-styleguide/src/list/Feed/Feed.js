import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const { oneOfType, node, arrayOf } = PropTypes

Feed.propTypes = {
  /** Use FeedItem component to compose the Feed. */
  children: oneOfType([node, arrayOf(node)]).isRequired
}

Feed.displayName = 'Feed'

/* @component */
export default Feed
