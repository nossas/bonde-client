import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import FacebookEvent from './facebook-event'

// will be passed a list of events in props
const FacebookPage = (props) => {
  const { name, events } = props
  return (
    <div className={css(styles.page)}>
      <h3>{ name }</h3>
      {
        events && events.length
        ? events && events.map((event) => <FacebookEvent key={event.id} {...event} />)
        : <div>This Facebook page doesn't have any events</div>
      }
    </div>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 30
  }
})

export default FacebookPage
