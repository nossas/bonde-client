import React from 'react'
import BackgroundContainer from '~routes/admin/not-authenticated/background.connected'

const withBackground = Component => props => (
  <BackgroundContainer {...props}>
    <Component {...props} />
  </BackgroundContainer>
)

export default withBackground
