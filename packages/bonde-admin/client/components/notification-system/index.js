import React from 'react'
import NotificationsSystem from 'reapop'
import theme from './theme'

const NotificationSystem = () => (
  require('exenv').canUseDOM
    ? <NotificationsSystem {...{ theme }} />
    : <div />
)

export default NotificationSystem
