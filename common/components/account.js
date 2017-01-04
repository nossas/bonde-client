import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Link } from 'react-router'

const Account = (props) => {
  const { account: { name, club } } = props
  return (
    <div>
      <div className={css(styles.info)}>
        <h3>Name: { name }</h3>
      </div>
      {
        club && (
          <Link to='account/dashboard'>
            <div className={css(styles.button)}>View Event Dashboard</div>
          </Link>
        )
      }
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
