import React from 'react'
// import { StyleSheet, css } from 'aphrodite'
import Purchase from './event/purchase'

const Event = ({ dateAdded }) => (
  <div>
    <p>Added: {dateAdded}</p>
    <Purchase />
  </div>
)

// const styles = StyleSheet.create({
//   dashboard: {
//
//   }
// })

export default Event
