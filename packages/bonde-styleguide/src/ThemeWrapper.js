import React from 'react'
import { ThemeProvider } from 'styled-components'
import WebFont from 'webfontloader'

import './global.css'

WebFont.load({
  google: {
    families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
  }
})

//
// TODO: Define
//
const theme = {
  main: 'mediumseagreen'
};

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
