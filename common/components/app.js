import React from 'react'
import Helmet from 'react-helmet'
import Nav from './global/nav'
import Footer from './global/footer'
import { StyleSheet, css } from 'aphrodite'

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title='Vibrate' titleTemplate='%s' />
    <h1 className={css(styles.title)}>Vibrate</h1>
    <Nav />
    {children}
    <Footer />
  </div>
)

const styles = StyleSheet.create({
  root: {
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem'
  },
  title: {
    color: '#000',
    maxWidth: 300,
    fontWeight: 'bold',
    fontSize: 56
  }
})

export default App
