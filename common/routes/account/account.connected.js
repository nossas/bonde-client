import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { actions as authActions } from '../../../authenticate/redux'
import Account from '../../components/account'

const redial = {
  fetch: ({ dispatch }) => dispatch(authActions.load())
}

const mapStateToProps = (state) => ({
  account: state.auth
})

const AccountPage = (props) => {
  const { account, logout } = props
  return (
    <div>
      <Helmet title='Account Account' />
      <h2 className={css(styles.title)}>Account</h2>
      <Account {...account} />
      <button style={{ cursor: 'pointer' }} onClick={() => {
        logout()
      }}>Logout</button>
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

export default provideHooks(redial)(connect(mapStateToProps, { logout: authActions.logout })(AccountPage))
