import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import FacebookPage from './facebook-page'

const FacebookEvents = (props) => {
  const { pages } = props
  return (
    <div className={css(styles.events)}>
      <h2>Publish a new event</h2>
      <p className={css(styles.subHeading)}>Create an event from one of your Facebook events</p>
      {
        pages && pages.length
        ? pages && pages.map((page) => <FacebookPage key={page.id} {...page} />)
        : <span>Looks like you don't have any Facebook pages</span>
      }
    </div>
  )
}

const styles = StyleSheet.create({
  subHeading: {
    marginBottom: 0
  }
})

export default FacebookEvents
