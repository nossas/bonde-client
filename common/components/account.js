import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Account = (props) => {
  const { user } = props
  return (
    <div>
      <div className={css(styles.info)}>
        <h3>Name: { user ? `${user.first_name} ${user.last_name}` : 'Anonymous User' }</h3>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  info: {
    display: 'inline-block'
  },
  button: {
    float: 'right',
    display: 'inline-block',
    width: '50%',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#242424',
    color: '#fff'
  }
})

export default Account
