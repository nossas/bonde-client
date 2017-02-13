import React from 'react'
import { css, StyleSheet } from 'aphrodite'

const Footer = () => (
  <div className={css(styles.footer)}>
    <p className={css(styles.footerText)}>Footer</p>
  </div>
)

const styles = StyleSheet.create({
  footerText: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7'
  }
})

export default Footer
