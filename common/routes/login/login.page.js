import React from 'react'
import Helmet from 'react-helmet'

import { FormLogin } from '../../../client/components/account'

const LoginPage = () => (
  <div>
    <Helmet title='Login' />
    <FormLogin />
  </div>
)

export default LoginPage
