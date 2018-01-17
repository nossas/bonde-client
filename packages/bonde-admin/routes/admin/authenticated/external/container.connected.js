import React from 'react'

const image = require('exenv').canUseDOM
  ? require('~client/images/bg-login.png')
  : ''

const Container = ({ children }) => (
  <div>
    {React.cloneElement(children, { image })}
  </div>
)

export default Container
