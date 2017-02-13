import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import { css, StyleSheet } from 'aphrodite'

const NewEvent = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className={css(styles.inputWrapper)}>
      <label className={css(styles.label)} htmlFor='name'>Event Name</label>
      <Field name='name' component='input' type='text' />
    </div>
    <button className={css(styles.button)}>
      Create Event
    </button>
    <div className={css(styles.noLink)}>
      <Link to='/account/dashboard'>Cancel</Link>
    </div>
  </form>
)

const styles = StyleSheet.create({
  noLink: {
    textDecoration: 'none'
  },
  inputWrapper: {
    paddingTop: 20,
    paddingBottom: 20
  },
  label: {
    paddingRight: 10
  },
  button: {
    width: '50%',
    padding: 10,
    border: 'none',
    borderRadius: 5,
    backgroundColor: '#242424',
    fontSize: 16,
    color: '#fff'
  }
})

export default NewEvent
