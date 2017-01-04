import React from 'react'
import { Link } from 'react-router'
import { css, StyleSheet } from 'aphrodite'
// import moment from 'moment'

const FacebookEvent = (props) => {
  const { name, id, startTime } = props
  const date = startTime
  return (
    <Link
      to={`/account/dashboard/newevent/${id}`}
      className={css(styles.noLink)}>
      <div
        className={css(styles.event)}>
        <div className={css(styles.eventText)}>
          <p>{name}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  )
}

const styles = StyleSheet.create({
  noLink: {
    textDecoration: 'none'
  },
  event: {
    marginTop: 30,
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  eventText: {
    color: '#2c8688',
    ':hover': {
      color: '#a81c13'
    }
  }
})

export default FacebookEvent
