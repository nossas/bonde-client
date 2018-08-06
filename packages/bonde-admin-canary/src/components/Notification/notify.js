import React from 'react'
import { toast } from 'react-toastify'
import Success from './Success'

export default (message) => toast(
  ({ closeToast }) => (
    <Success
      message={message}
      closeToast={closeToast}
    />
  ),
  {
    closeButton: false
  }
)
