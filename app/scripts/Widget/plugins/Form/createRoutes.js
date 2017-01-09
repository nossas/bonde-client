import React from 'react'
import { Route } from 'react-router'

import { Fields, Form } from './pages'

export default () => [
  <Route key='form-config' path='/form' component={Form} />,
  <Route key='form-fields' path='/fields' component={Fields} />
]
