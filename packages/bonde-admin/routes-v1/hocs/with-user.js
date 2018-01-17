import React from 'react'
import CurrentUserContainer from '~routes/admin/authenticated/container'

const withUser = Component => props => (
  <CurrentUserContainer {...props}>
    <Component {...props} />
  </CurrentUserContainer>
)

export default withUser
