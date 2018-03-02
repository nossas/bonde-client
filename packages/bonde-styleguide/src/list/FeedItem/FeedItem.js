import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Time = styled.div`
  display: table-cell;
  padding: 23px 0 23px 20px;
  border-bottom: 1px solid #eeeeee;
  font-family: Nunito Sans;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.6;
  color: #9b9b9b;
  white-space: nowrap;
  width: 35px;
`

const FeedText = styled.div`
  display: table-cell;
  padding: 23px 35px 23px 40px;
  border-bottom: 1px solid #eeeeee;
  font-family: Nunito Sans;
  font-size: 16px;
  line-height: 1.35;
  color: #333333;
`

/**
 * The item that composes the Feed component.
 * Each item updates the feed date difference per minute,
 * based on current date.
 */
const FeedItem = styled(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { now: new Date() }
  }

  componentDidMount () {
    this.timer = setInterval(() => this.setState({ now: new Date() }), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { className, date, text } = this.props

    const diff = Math.abs(this.state.now - new Date(date))
    const mins = Math.floor((diff / 1000) / 60)

    return (
      <li className={className}>
        <Time>{mins} min</Time>
        <FeedText>{text}</FeedText>
      </li>
    )
  }
})`
  display: table-row;
`

const { oneOfType, string, object, number } = PropTypes

FeedItem.propTypes = {
  /** Feed item date. It can be a Date object, UTC Date string or a timestamp. */
  date: oneOfType([string, object, number]).isRequired,
  /** Feed item text. */
  text: string.isRequired
}

/* @component */
export default FeedItem
