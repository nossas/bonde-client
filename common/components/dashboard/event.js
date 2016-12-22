import React from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const Event = ({event}) => {
  return (
    <div className={css(styles.event)}>
      <Link to={`/venues/123/events/${event}`}>
        <h3 className={css(styles.eventText)}>Event id: {event}</h3>
      </Link>
    </div>
  )
}

const styles = StyleSheet.create({
  event: {
    textDecoration: 'none'
  },
  eventText: {
    color: '#060606',
    paddingTop: 15
  }
})

export default Event
