import React from 'react'
import { Backdrop } from 'bonde-styleguide'
import Loading from './Loading'
import PropTypes from 'prop-types'

const LoadingFullScreen = ({ message }) => (
  <Backdrop color='#FFFFFF'>
    <Loading
      message={message}
    />
  </Backdrop>
)

LoadingFullScreen.propTypes = {
  message: PropTypes.string
}

export default LoadingFullScreen
