import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const Login = () => (
  <div className={css(styles.login)}>
    <a
      href='/api/users/login'
      className={css(styles.button, styles.facebook)}>
      Login with Facebook
    </a>
    <div className={css(styles.info)}>
      <p>Login is not required to purchase tickets</p>
    </div>
  </div>
)

const styles = StyleSheet.create({
  login: {
    paddingTop: 100
  },
  button: {
    width: '50%',
    display: 'block',
    margin: 'auto',
    marginTop: 30,
    border: 0,
    fontSize: 16,
    outline: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none'
  },
  facebook: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#3B5998',
    color: '#fff',
    fontWeight: 700,
    ':active': {
      opacity: 0.9
    }
  },
  info: {
    padding: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#3B5998',
    fontWeight: 600
  }
})

export default Login
