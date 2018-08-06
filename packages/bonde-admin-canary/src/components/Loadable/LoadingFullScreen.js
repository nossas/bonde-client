import React from 'react'
import { Backdrop } from 'bonde-styleguide'
import Loading from './Loading'

const LoadingFullScreen = ({ message }) => (
  <Backdrop color='#FFFFFF'>
    <Loading
      message={message || 'Preparando seu BONDE.'}
    />
  </Backdrop>
)

export default LoadingFullScreen
