import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { loadEvent } from '../../redux/action-creators/load-event'
import Event from '../../components/event'

const redial = {
  fetch: ({ dispatch, params: { eventId } }) => dispatch(loadEvent(eventId))
}

const mapStateToProps = (state) => ({
  event: state.event
})

const EventPage = (props) => {
  const { event: { data } } = props
  return (
    <div>
      <Helmet title='Event Page' />
      <h2 className={css(styles.title)}>Event name: {data.name}</h2>
      <Event {...data} />
    </div>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  alert: {
    backgroundColor: '#85cb82',
    borderRadius: 5,
    marginBottom: 20
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(EventPage))
