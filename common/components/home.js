import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Home = (props) => (
  <div>
    <h2 className={css(styles.header)}>Home</h2>
    <p className={css(styles.lead)}>
      The easiest way to sell tickets to club events
    </p>
  </div>
)

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    lineHeight: '1.2',
    margin: '0 0 1.5rem'
  },
  lead: {
    fontSize: 18,
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '0 0 1.5rem',
    color: '#555'
  }
})

export default Home
