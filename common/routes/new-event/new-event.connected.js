import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { createEvent } from '../../redux/action-creators/create-event'
import { loadFbEvent } from '../../redux/action-creators/load-fb-event'
import NewEvent from '../../components/new-event.connected'

const redial = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadFbEvent(id))
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})

const NewEventPage = (props) => {
  const { createEvent } = props
  return (
    <div className={css(styles.root)}>
      <Helmet title='New Event' />
      <h2 className={css(styles.title)}>New Event</h2>
      <NewEvent createEvent={createEvent} />
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps, { createEvent })(NewEventPage))
