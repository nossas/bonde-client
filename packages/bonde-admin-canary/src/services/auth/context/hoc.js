import React from 'react'
import { AuthContext } from './Context'

const auth = () => Component => (props) => (
  <AuthContext.Consumer>
    {user => (<Component user={user} {...props} />)}
  </AuthContext.Consumer>
)

export default auth
