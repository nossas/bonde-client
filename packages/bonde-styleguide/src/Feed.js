import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Feed = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  width: 100%;
`

//
// TODO
// Implements date diff presentation in:
// - seconds
// - minutes (done)
// - hours
// - days
// - months
// - years
//
class FeedItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { now: new Date }
  }

  ticker () {
    this.setState({ now: new Date })
  }

  componentDidMount () {
    this.timer = setInterval(::this.ticker, 1000)
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
}

Feed.Item = styled(FeedItem)`
  display: table-row;
`

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

const { oneOfType, string, object } = PropTypes

Feed.Item.propTypes = {
  date: oneOfType([string, object]),
  text: string
}

Feed.displayName = 'Feed'
Feed.Item.displayName = 'Feed.Item'

export default Feed

